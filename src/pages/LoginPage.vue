<template>
  <section class="py-6 md:py-12">
    <div class="max-w-md mx-auto px-4">
      <h1 class="text-2xl font-semibold text-foreground">{{ $t('auth.login.title') }}</h1>
      <p class="mt-2 text-muted-foreground">
        {{ $t('auth.login.subTitle') }}
      </p>
      <LoginForm />
    </div>
  </section>

</template>

<script>
import LoginForm from '@/components/auth/LoginForm.vue';

export default {
  name: 'LoginPage',
  components: {
    LoginForm,
  }
}
</script>

<style scoped></style>