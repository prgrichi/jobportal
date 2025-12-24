<template>
  <div>
    <div class="mb-4">
      <JobFilter :jobs="jobs" />
    </div>

    <div class="mt-6 grid gap-4 grid-cols-1 md:grid-cols-3">

      <template v-if="isLoading">
        <JobSkeleton v-for="n in 6" :key="`sk-${n}`" />
      </template>

      <template v-else>
        <JobSingle v-for="job in jobs" :key="job.id" :job="job" />
      </template>

      <template v-if="error">
        <div class="col-span-full text-center text-red-500">
          {{ error }}
        </div>
      </template>

    </div>
  </div>
</template>

<script>
import jobsMixin from '@/mixins/jobsMixin';
import JobSingle from './JobSingle.vue';
import JobSkeleton from './JobSkeleton.vue';
import JobFilter from './JobFilter.vue';

export default {
  name: 'Jobs',
  components: {
    JobSingle,
    JobSkeleton,
    JobFilter
  },
  mixins: [jobsMixin],
  created() {
    this.fetchJobs({
      orderBy: { field: 'createdAt', direction: 'desc' },
      limit: 6
    });
  }
}
</script>

<style scoped></style>
