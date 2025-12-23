<template>
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
</template>

<script>
import JobSingle from './JobSingle.vue';
import JobSkeleton from './JobSkeleton.vue';

export default {
  name: 'Jobs',
  components: {
    JobSingle,
    JobSkeleton
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