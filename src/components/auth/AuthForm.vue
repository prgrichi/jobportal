<template>

  <!-- Auth Form (Login/Register) -->
  <Form @submit="onSubmit" novalidate :validation-schema="schema" v-slot="{ errors }"
    class="max-w-md mx-auto rounded-lg mt-10">

    <!-- Email Field -->
    <div class="mb-4">
      <label for="email" class="block text-sm font-medium text-muted-foreground mb-1">
        {{ $t('auth.general.email') }}
      </label>
      <Field as="input" name="email" type="email" id="email" autocomplete="email"
        class="w-full border bg-background border-border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-ring"
        :placeholder="$t('auth.general.placeholder.email')" :aria-invalid="!!errors.email"
        :aria-describedby="errors.email ? 'email-error' : undefined" />
      <ErrorMessage name="email" v-slot="{ message }">
        <small id="email-error" class="text-red-500">{{ message }}</small>
      </ErrorMessage>
    </div>

    <!-- Password Field -->
    <div class="mb-6">
      <label for="password" class="block text-sm font-medium text-muted-foreground mb-1">
        {{ $t('auth.general.password') }}
      </label>
      <div class="relative">
        <Field as="input" :type="toggleInputType" name="password" id="password" :autocomplete="passwordAutocomplete"
          class="w-full border bg-background border-border rounded-md p-2 pr-12 focus:outline-none focus:ring-2 focus:ring-ring"
          :placeholder="$t('auth.general.placeholder.password')" :aria-invalid="!!errors.password"
          :aria-describedby="errors.password ? 'password-error' : undefined" />
        <button type="button" @click="togglePassword" class="h-full cursor-pointer absolute p-2 right-1 top-0"
          :aria-label="showPasswordLabel">
          <Icon aria-hidden="true" :name="showPassword ? 'EyeSlash' : 'Eye'" icon-class="h-5 w-5" />
        </button>
      </div>
      <ErrorMessage name="password" v-slot="{ message }">
        <small id="password-error" class="text-red-500">{{ message }}</small>
      </ErrorMessage>
    </div>

    <!-- Confirm Password Field (nur bei Register) -->
    <div v-if="mode === 'register'" class="mb-6">
      <label for="confirmPassword" class="block text-sm font-medium text-muted-foreground mb-1">
        {{ $t('auth.general.confirmPassword') }}
      </label>
      <div class="relative">
        <Field as="input" name="confirmPassword" :type="toggleConfirmInputType" id="confirmPassword"
          autocomplete="new-password"
          class="w-full border bg-background border-border rounded-md p-2 pr-12 focus:outline-none focus:ring-2 focus:ring-ring"
          :placeholder="$t('auth.general.placeholder.confirmPassword')" :aria-invalid="!!errors.confirmPassword"
          :aria-describedby="errors.confirmPassword ? 'password-confirm-error' : undefined" />
        <button type="button" @click="toggleConfirmPassword" class="h-full cursor-pointer absolute p-2 right-1 top-0"
          :aria-label="showPasswordConfirmLabel">
          <Icon aria-hidden="true" :name="showConfirmPassword ? 'EyeSlash' : 'Eye'" icon-class="h-5 w-5" />
        </button>
      </div>
      <ErrorMessage name="confirmPassword" v-slot="{ message }">
        <small id="password-confirm-error" class="text-red-500">{{ message }}</small>
      </ErrorMessage>
    </div>

    <!-- Submit Button -->
    <button type="submit" :disabled="isLoading" :aria-busy="isLoading" class="btn btn-primary w-full">
      <!-- Loading Spinner -->
      <span v-if="isLoading" aria-hidden="true"
        class="h-4 w-4 animate-spin rounded-full border-2 border-background border-t-transparent"></span>
      <span>{{ submitLabel }}</span>
    </button>

  </Form>

</template>

<script>
import { Form, Field, ErrorMessage } from 'vee-validate';
import { useToastStore } from '@/stores/toast/toast';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/config/firebase';
import { useAuthStore } from '@/stores/auth/auth';
import { useI18n } from 'vue-i18n';
import { createLoginSchema, createRegisterSchema } from '@/schemas';

export default {
  name: 'AuthForm',

  setup() {
    const { t, locale } = useI18n();
    return { t, locale };
  },

  components: {
    Form,
    Field,
    ErrorMessage
  },

  props: {
    mode: {
      type: String,
      required: true,
      validator: (value) => ['login', 'register'].includes(value)
    }
  },

  data() {
    return {
      isLoading: false,
      showPassword: false,
      showConfirmPassword: false
    };
  },

  computed: {
    authStore() {
      return useAuthStore();
    },
    toast() {
      return useToastStore();
    },
    passwordAutocomplete() {
      return this.mode === 'register' ? 'new-password' : 'current-password';
    },
    schema() {
      return this.mode === 'login' ? createLoginSchema() : createRegisterSchema();
    },
    toggleInputType() {
      return this.showPassword ? 'text' : 'password';
    },
    toggleConfirmInputType() {
      return this.showConfirmPassword ? 'text' : 'password';
    },
    // Dynamic Submit Button Label
    submitLabel() {
      if (this.mode === 'register') {
        return this.isLoading
          ? this.t('general.btn.ui.creatingAccount')
          : this.t('general.btn.ui.createAccount');
      }
      return this.isLoading
        ? this.t('general.btn.ui.signingIn')
        : this.t('general.btn.ui.signIn');
    },
    showPasswordLabel() {
      return this.showPassword
        ? this.t('auth.general.hidePassword')
        : this.t('auth.general.showPassword');
    },
    showPasswordConfirmLabel() {
      return this.showConfirmPassword
        ? this.t('auth.general.hidePassword')
        : this.t('auth.general.showPassword');
    }
  },

  methods: {
    async onSubmit(values) {
      try {
        this.isLoading = true;

        // Register Mode
        if (this.mode === 'register') {
          const userCredential = await createUserWithEmailAndPassword(
            auth,
            values.email,
            values.password
          );
          await this.authStore.createUserDocument(userCredential.user);
          this.toast.success(this.t('toast.registerSuccess'));
          this.$router.push({ name: 'home' });
        }
        // Login Mode
        else {
          const userCredential = await signInWithEmailAndPassword(
            auth,
            values.email,
            values.password
          );
          await this.authStore.createUserDocument(userCredential.user);
          this.toast.success(this.t('toast.loginSuccess'));

          // Redirect to previous page or home
          const redirectPath = this.$route.query.redirect || '/';
          this.$router.push(redirectPath);
        }

        this.isLoading = false;
      } catch (error) {
        this.isLoading = false;

        // Handle Firebase Auth Errors
        if (error.code === 'auth/invalid-credential') {
          this.toast.error(this.t('errors. invalidCredentials'));
        }
        else if (error.code === 'auth/email-already-in-use') {
          this.toast.error(this.t('errors.emailAlreadyInUse'));
        }
        else {
          this.toast.error(error.message);
        }
      }
    },
    togglePassword() {
      this.showPassword = !this.showPassword;
    },
    toggleConfirmPassword() {
      this.showConfirmPassword = !this.showConfirmPassword;
    }
  },
}
</script>