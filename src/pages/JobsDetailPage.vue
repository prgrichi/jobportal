<template>
  <div class="min-h-screen bg-muted py-6 md:py-12">

    <!-- Loading State -->
    <div v-if="jobStore.isLoading" class="w-full block text-center mt-6">
      {{ general.loading }}
    </div>

    <!-- Error State -->
    <div v-else-if="jobStore.error" class="w-full block text-center mt-6 text-red-500">
      {{ jobStore.error }}
    </div>

    <!-- Job Content -->
    <div v-else-if="job">

      <!-- Header/Breadcrumb -->
      <JobDetailHeader :job-number="job.jobNumber || job.id" :back-route="backRoute" />

      <!-- Main Content -->
      <section class="mx-auto max-w-app px-4 py-8">

        <!-- Hero + Sidebar -->
        <div class="grid gap-6 lg:grid-cols-12">
          <JobDetailHero :job="job" />
          <JobDetailSidebar :job="job" :remote-label="remoteLabel" :created-at="createdAtDE" @apply="handleApply" />
        </div>

        <!-- 3 Panels -->
        <JobDetailPanels :job="job" />

        <!-- Bottom CTA -->
        <JobDetailCTA @save="handleSave" :job="job" :is-favorited="isFavorited"
          @apply="handleApply" />

      </section>
    </div>

  </div>
</template>

<script>
import { useJobStore } from '@/stores/jobs/jobs';
import { useAuthStore } from '@/stores/auth/auth';
import { useFavoritesStore } from '@/stores/jobs/favorites';
import JobDetailHeader from '@/components/jobs/detail/JobDetailHeader.vue';
import JobDetailHero from '@/components/jobs/detail/JobDetailHero.vue';
import JobDetailSidebar from '@/components/jobs/detail/JobDetailSidebar.vue';
import JobDetailPanels from '@/components/jobs/detail/JobDetailPanels.vue';
import JobDetailCTA from '@/components/jobs/detail/JobDetailCTA.vue';

export default {
  name: 'JobsDetailPage',

  components: {
    JobDetailHeader,
    JobDetailHero,
    JobDetailSidebar,
    JobDetailPanels,
    JobDetailCTA
  },

  props: {
    id: {
      type: String,
      required: true
    }
  },
  computed: {
    jobStore() {
      return useJobStore();
    },
    authStore() {
      return useAuthStore();
    },
    favoritesStore() {
      return useFavoritesStore();
    },
    job() {
      return this.jobStore.singleJob;
    },
    createdAtDE() {
      if (!this.job || !this.job.createdAt) return '-';
      const date = this.job.createdAt.toDate ? this.job.createdAt.toDate() : new Date(this.job.createdAt);
      return date.toLocaleDateString('de-DE', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      });
    },
    remoteLabel() {
      return this.job?.remote ? 'Remote möglich' : 'Vor Ort';
    },
    backRoute() {
      const previousRoute = this.$route.meta.previousRoute;

      if (previousRoute === '/') {
        return { name: 'home' };
      }
      if (previousRoute === '/jobs') {
        return { name: 'jobs' };
      }
      return { name: 'home' };
    }
  },

  async created() {
    await this.jobStore.fetchJobByIdWithCache(this.id);
  },

  methods: {
    handleApply() {
      console.log('Apply clicked for job:', this.job.id);
      // TODO: Implement apply logic
      // z.B. Modal öffnen, zu Bewerbungsformular navigieren, etc.
    },

    handleSave() {
      console.log('Save clicked for job:', this.job.id);

      this.favoritesStore.toggleFavorite(this.job);
      // this.isAnimating = true;
      // setTimeout(() => {
      //   this.isAnimating = false;
      // }, 500);
    }
  }
}
</script>