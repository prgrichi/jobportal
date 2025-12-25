<template>
  <header class="sticky top-0 z-40 border-b border-neutral-200 bg-white/80 backdrop-blur-sm">
    <div class="mx-auto max-w-app px-4">
      <div class="flex h-16 items-center justify-between">

        <!-- Logo -->
        <RouterLink :to="{ name: 'home' }" class="text-sm font-semibold text-neutral-900">Jobportal</RouterLink>

        <!-- Navigation -->
        <nav v-if="authReady" class="flex items-center gap-6 text-sm">
          <p class="text-neutral-600 hover:text-neutral-900 transition after:content-['/'] after:ml-6"
            v-if="authStore.isAuthenticated">Hallo, {{
              authStore.userName }}</p>

          <RouterLink :to="{ name: 'jobs' }" class="text-neutral-600 hover:text-neutral-900 transition">Jobs
          </RouterLink>

          <RouterLink :to="{ name: 'login' }" v-if="!isAuthenticated"
            class="text-neutral-600 hover:text-neutral-900 transition">Login
          </RouterLink>

          <RouterLink :to="{ name: 'register' }" v-if="!isAuthenticated" class="inline-flex items-center justify-center rounded-lg
          bg-primary-500 px-4 py-2
                        text-sm font-medium text-white
                        transition hover:bg-primary-600
                        focus:outline-none focus:ring-2 focus:ring-primary-500/30">Registrieren</RouterLink>

          <button v-if="isAuthenticated" class="btn btn-secondary" @click="handleLogout">
            Logout
          </button>

        </nav>

      </div>
    </div>
  </header>
</template>

<script>
import { signOut } from 'firebase/auth';
import { auth } from '@/config/firebase';
import { useToastStore } from '@/stores/toast/toast';
import { useAuthStore } from '@/stores/auth/auth';

export default {
  name: 'TheHeader',
  computed: {
    authStore() {
      return useAuthStore();
    },
    isAuthenticated() {
      return this.authStore.isAuthenticated;
    },
    authReady() {
      return this.authStore.authReady;
    },
  },
  methods: {
    async handleLogout() {
      const toast = useToastStore();

      try {
        await signOut(auth);

        toast.success('Erfolgreich ausgeloggt');
        this.$router.push({ name: 'home' });
      } catch (err) {
        toast.error('Logout fehlgeschlagen');
      }
    },
  }
}
</script>

<style scoped></style>