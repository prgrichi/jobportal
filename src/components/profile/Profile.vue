<template>
  <div>
    <div class="max-w-app mx-auto">

      <!-- Header -->
      <ProfileHeader :title="$t('profile.title')" :subtitle="$t('profile.subtitle')" />

      <!-- Loading State -->
      <div v-if="loading" class="text-center py-20">
        <p class="text-muted-foreground">{{ $t('general.loading') }}</p>
      </div>

      <!-- Profile Content -->
      <div v-else>

        <!-- View Mode -->
        <ProfileView v-if="!isEditing" :profile="profile" :display-name="displayName"
          :edit-button-text="$t('general.btn.edit')" @edit="startEdit" />

        <!-- Edit Mode -->
        <ProfileEdit v-else :profile="profile" :is-saving="isSaving" :title="$t('profile.editProfile')"
          :save-button-text="isSavingLabel" :cancel-button-text="$t('general.btn.cancel')" @save="save"
          @cancel="cancel" />

      </div>

    </div>
  </div>
</template>

<script>
import { useProfileStore } from '@/stores/user/profile';
import { useAuthStore } from '@/stores/auth/auth';
import { useToastStore } from '@/stores/toast/toast';
import { useI18n } from 'vue-i18n';
import ProfileHeader from './ProfileHeader.vue';
import ProfileView from './ProfileView.vue';
import ProfileEdit from './ProfileEdit.vue';

export default {
  name: 'Profile',

  components: {
    ProfileHeader,
    ProfileView,
    ProfileEdit
  },

  setup() {
    const { t, locale } = useI18n();
    return { t, locale };
  },

  data() {
    return {
      isEditing: false,
      isSaving: false
    };
  },

  computed: {
    profileStore() {
      return useProfileStore();
    },
    authStore() {
      return useAuthStore();
    },
    toast() {
      return useToastStore();
    },
    loading() {
      return this.profileStore.loading;
    },
    profile() {
      return this.profileStore.profile || {};
    },
    isSavingLabel() {
      return this.isSaving
        ? this.$t('general.btn.ui.saving')
        : this.$t('general.btn.ui.save');
    },
    displayName() {
      const first = this.profile.firstName || '';
      const last = this.profile.lastName || '';
      const name = `${first} ${last}`.trim();
      return name || 'Unbekannt';
    }
  },

  methods: {
    startEdit() {
      this.isEditing = true;
    },

    cancel() {
      this.isEditing = false;
      this.isSaving = false;
    },

    async save(editData) {
      this.isSaving = true;

      const result = await this.profileStore.updateProfile(
        this.authStore.user.uid,
        editData
      );

      this.isSaving = false;

      if (result.success) {
        this.isEditing = false;
        this.toast.success(this.t('toast.profileSuccess'));
      } else {
        this.toast.error(this.t('toast.profileError'));
      }
    }
  },

  mounted() {
    if (this.authStore.user) {
      this.profileStore.loadProfile(this.authStore.user.uid);
    }
  }
};
</script>