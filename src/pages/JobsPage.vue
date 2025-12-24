<template>
  <section class="py-12">
    <div class="max-w-app mx-auto px-4">
      <h1 class="text-2xl font-semibold text-neutral-900 mb-6">Übersicht</h1>
      <Jobs />
    </div>
  </section>
</template>

<script>
import Jobs from '@/components/jobs/Jobs.vue';

export default {
  name: 'JobsPage',
  components: {
    Jobs
  },
}
</script>

<style scoped></style>
