<!-- components/jobs/JobSkeleton.vue -->
<template>
  <article class="rounded-2xl bg-gray-50 p-5 ring-1 ring-gray-200 animate-pulse" aria-busy="true" aria-label="Job lädt">
    <!-- Title -->
    <div class="h-4 w-3/4 rounded bg-gray-200"></div>

    <!-- Company / Location -->
    <div class="mt-2 h-3 w-1/2 rounded bg-gray-200"></div>

    <!-- Tags -->
    <div class="mt-4 flex flex-wrap gap-2">
      <div class="h-6 w-16 rounded-full bg-gray-200"></div>
      <div class="h-6 w-20 rounded-full bg-gray-200"></div>
      <div class="h-6 w-14 rounded-full bg-gray-200"></div>
      <div class="h-6 w-24 rounded-full bg-gray-200"></div>
    </div>

    <!-- Footer: salary + link hint -->
    <div class="mt-4 flex items-center justify-between">
      <div class="h-3 w-28 rounded bg-gray-200"></div>
      <div class="h-3 w-16 rounded bg-gray-200"></div>
    </div>
  </article>
</template>

<script>
export default {
  name: "JobSkeleton",
};
</script>
