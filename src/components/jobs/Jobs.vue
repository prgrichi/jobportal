<template>
  <div class="mt-6 grid gap-4 grid-cols-1 md:grid-cols-3">

    <template v-if="isLoading">
      <JobSkeletonCard v-for="n in 6" :key="`sk-${n}`" />
    </template>

    <template v-else>
      <RouterLink v-for="job in jobs" :key="job.id" :to="`/jobs/${job.id}`" class="block">
        <JobSingle :job="job" />
      </RouterLink>
    </template>

    <template v-if="error">
      <div class="col-span-full text-center text-red-500">
        {{ error }}
      </div>
    </template>

  </div>
</template>

<script>
import JobSingle from './JobSingle.vue';
import JobSkeletonCard from "@/components/jobs/JobSkeletonCard.vue";

export default {
  name: 'Jobs',
  components: {
    JobSingle,
    JobSkeletonCard
  },
  props: {
    jobs: {
      type: Array,
      required: true
    },
    error: {
      type: String,
      default: null
    },
    isLoading: {
      type: Boolean,
      default: false
    },
  }
}
</script>

<style scoped></style>