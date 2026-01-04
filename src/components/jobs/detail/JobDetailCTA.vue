<template>
  <!-- Job Detail CTA Section -->
  <div class="mt-6 rounded-3xl bg-background p-6 ring-1 ring-ring">
    <div class="flex flex-col gap-3 sm:flex-row sm:items-center sm: justify-between">

      <!-- CTA Text -->
      <div>
        <p class="text-sm font-semibold text-foreground">
          {{ $t('jobs.jobDetail.ctaText1') }}
        </p>
        <p class="mt-1 text-sm text-muted-foreground">
          {{ $t('jobs.jobDetail.ctaText2') }}
        </p>
      </div>

      <!-- Action Buttons -->
      <div class="flex flex-wrap gap-2">
        <!-- Save Button -->
        <button type="button" :disabled="loading" class="btn btn-secondary" @click="$emit('save')">
          {{ showFavorite }}
          <Icon v-if="isFavorited" name="Check" icon-class="h-4 w-4 text-foreground" />
        </button>

        <!-- Apply Button -->
        <button type="button" class="btn btn-primary" @click="$emit('apply')">
          {{ $t('general.btn.apply') }}
        </button>
      </div>

    </div>
  </div>
</template>

<script>
import { useI18n } from 'vue-i18n';
import { useFavoritesStore } from '@/stores/jobs/favorites';
import Icon from '@/components/ui/Icon.vue';

export default {
  name: 'JobDetailCTA',
  components: {
    Icon
  },
  setup() {
    const { t, locale } = useI18n();
    return { t, locale };
  },
  props: {
    job: {
      type: Object,
      required: true
    }
  },
  computed: {
    showFavorite() {
      return this.isFavorited ? this.t('general.btn.saved') : this.t('general.btn.save');
    },
    favoritesStore() {
      return useFavoritesStore();
    },
    loading() {
      return this.favoritesStore.loading;
    },
    isFavorited() {
      return this.favoritesStore.isJobFavorited(this.job.id);
    },
  },

  emits: ['save', 'apply']
}
</script>

<style scoped>
@keyframes scale-in {
  0% {
    transform: scale(0);
    opacity: 0;
  }

  50% {
    transform: scale(1.2);
  }

  100% {
    transform: scale(1);
    opacity: 1;
  }
}

.animate-scale-in {
  animation: scale-in 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
}
</style>