<template>
  <article class="group rounded-2xl bg-gray-50 p-5 ring-1 ring-gray-200
           transition hover:bg-white hover:shadow-sm">
    <!-- Title -->
    <h3 class="text-[15px] font-semibold leading-snug text-gray-900">
      {{ job.title }}
    </h3>

    <!-- Company / Location -->
    <p class="mt-1 text-sm text-gray-600">
      <span class="font-medium text-gray-800">{{ job.company }}</span>
      <span class="text-gray-400"> · </span>
      <span>{{ job.location }}</span>
    </p>

    <!-- Tags -->
    <div v-if="job.tags?.length" class="mt-4 flex flex-wrap gap-2">
      <span v-for="tag in job.tags.slice(0, 6)" :key="tag" class="rounded-full bg-white px-3 py-1
               text-xs font-medium text-gray-700
               ring-1 ring-inset ring-gray-300">
        {{ tag }}
      </span>
    </div>

    <!-- Footer -->
    <div class="mt-4 flex items-center justify-between">
      <!-- Salary -->
      <span v-if="job.salaryRange" class="text-sm font-medium text-gray-900">
        {{ job.salaryRange }}
      </span>

      <!-- Link hint -->
      <span class="inline-flex items-center gap-1 text-xs font-medium
               text-gray-500 transition
               group-hover:text-gray-900">
        Details
        <span class="transition group-hover:translate-x-0.5">→</span>
      </span>
    </div>
  </article>
</template>

<script>
export default {
  name: 'JobSingle',
  props: {
    job: {
      type: Object,
      required: true
    }
  }
}
</script>

<style scoped></style>