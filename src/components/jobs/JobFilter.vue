<template>
  <div class="max-w-app mx-auto py-4 space-y-6">

    <!-- Filter -->
    <section class="rounded-2xl border border-gray-200 bg-white p-4 sm:p-6">
      <h3 class="text-lg font-semibold text-gray-900 mb-4">
        Filter
      </h3>

      <div class="flex flex-col sm:flex-row gap-3">
        <input v-model="searchText" type="text" placeholder="Jobs, Skills oder Unternehmen suchen…" class="w-full rounded-xl border border-gray-300 px-4 py-2 text-sm
             focus:outline-none focus:ring-2 focus:ring-primary-500/40" />
      </div>
    </section>

    <!-- Jobliste -->
    <section class="space-y-4">

      <div v-for="job in filteredJobs" :key="job.id" class="group rounded-2xl border border-gray-200 bg-white p-5
           hover:border-primary-500/40 hover:shadow-sm transition">
        <h3 class="text-base font-semibold text-gray-900 group-hover:text-primary-600">
          {{ job.title }}
        </h3>

        <!-- optional meta -->
        <div class="mt-1 text-sm text-gray-500">
          {{ job.company }} · {{ job.location }}
        </div>
      </div>

      <!-- Empty State -->
      <div v-if="filteredJobs.length === 0"
        class="rounded-2xl border border-dashed border-gray-300 bg-gray-50 p-8 text-center">
        <p class="text-sm text-gray-600">
          Keine Jobs gefunden
        </p>
      </div>

    </section>
  </div>

</template>

<script>
export default {
  name: 'JobFilter',
  props: {
    jobs: {
      type: Array,
      required: true
    },
  },
  data() {
    return {
      searchText: '',
    }
  },
  computed: {
    filteredJobs() {
      if (!this.searchText) {
        return this.jobs; // Wenn nichts eingegeben, zeige alle Jobs
      }

      const search = this.searchText.toLowerCase();

      return this.jobs.filter(job => { 
        const company = job.company?.toLowerCase() || ''

        return company.includes(search);
      })
    }
  },


}
</script>

<style scoped></style>