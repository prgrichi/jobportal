<template>
  <AuthForm mode="login" />
  <div v-if="showDemoCredentials" class="mt-6 rounded-xl bg-blue-50 p-4 text-sm text-blue-900">
    <p class="font-medium">{{ $t('demo.title') }}</p>
    <p class="mt-1 font-mono">demo@jobportal.dev</p>
    <p class="mt-1 font-mono">demo123</p>
    <p class="mt-1 text-blue-800">{{ $t('demo.alternative') }}</p>
  </div>
</template>

<script>
import AuthForm from './AuthForm.vue';

export default {
  name: 'LoginForm',
  components: {
    AuthForm,
  },
  computed: {
    showDemoCredentials() {
      return import.meta.env.VITE_SHOW_DEMO_CREDENTIALS === 'true';
    },
  },
};
</script>

<style scoped></style>
