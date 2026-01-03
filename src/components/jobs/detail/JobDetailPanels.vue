<template>
  <div class="mt-8 grid gap-4 lg:grid-cols-3">

    <!-- Beschreibung -->
    <JobDetailPanel title="Beschreibung" :content="job.description" />

    <!-- Aufgaben -->
    <JobDetailPanel title="Aufgaben" :items="job.responsibilities" />

    <!-- Profil -->
    <JobDetailPanel title="Profil" :items="job.requirements" />

  </div>
</template>

<script>
import JobDetailPanel from './JobDetailPanel.vue';

export default {
  name: 'JobDetailPanels',

  components: {
    JobDetailPanel
  },

  props: {
    job: {
      type: Object,
      required: true
    }
  }
}
</script>