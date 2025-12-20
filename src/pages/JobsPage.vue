<template>
  <section class="py-12">
    <div class="max-w-app mx-auto px-4">
      <h1 class="text-2xl font-semibold text-neutral-900">Übersicht</h1>
      <Jobs :jobs="jobs" :isLoading="isLoading" :error="error"></Jobs>
    </div>
  </section>
</template>

<script>
import jobsMixin from '@/mixins/jobsMixin';
import Jobs from '@/components/jobs/Jobs.vue';

export default {
  name: 'JobsPage',
  components: {
    Jobs
  },
  mixins: [jobsMixin],
  mounted() {
    this.fetchJobs();
  }
}
</script>

<style scoped></style>
