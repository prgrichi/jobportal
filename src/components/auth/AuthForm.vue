<template>
  <div class="mt-4 md:mt-6">
    <Form @submit="onSubmit" :validation-schema="schema" class="max-w-md mx-auto rounded-lg">
      <div class="mb-4">
        <label for="email" class="block text-sm font-medium text-neutral-700 mb-1">E-Mail</label>
        <Field as="input" name="email" type="email" id="email"
          class="w-full border bg-white border-neutral-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Gib deine E-Mail-Adresse ein">
        </Field>
        <ErrorMessage name="email" v-slot="{ message }">
          <small class="text-red-500">{{ message }}</small>
        </ErrorMessage>
      </div>

      <div class="mb-6">
        <label for="password" class="block text-sm font-medium text-neutral-700 mb-1">Passwort</label>
        <Field as="input" name="password" type="password" id="password"
          class="w-full border bg-white border-neutral-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Erstelle ein Passwort">
        </Field>
        <ErrorMessage name="password" v-slot="{ message }">
          <small class="text-red-500">{{ message }}</small>
        </ErrorMessage>
      </div>

      <div v-if="mode === 'register'" class="mb-6">
        <label for="confirmPassword" class="block text-sm font-medium text-neutral-700 mb-1">Passwort
          wiederholen</label>
        <Field as="input" name="confirmPassword" type="password" id="confirmPassword"
          class="w-full border bg-white border-neutral-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Passwort wiederholen">
        </Field>
        <ErrorMessage name="confirmPassword" v-slot="{ message }">
          <small class="text-red-500">{{ message }}</small>
        </ErrorMessage>
      </div>

      <button type="submit" :disabled="isLoading" class="btn btn-primary w-full">
        <span v-if="isLoading"
          class="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></span>
        <span>{{ submitLabel }}</span>
      </button>
    </Form>
  </div>
</template>

<script>
import { Form, Field, ErrorMessage } from 'vee-validate';
import * as yup from 'yup';
import { useToastStore } from '@/stores/toast/toast';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/config/firebase';

export default {
  name: 'AuthForm',
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
    const baseSchema = {
      email: yup.string().required('E-Mail ist erforderlich').email('Ungültige E-Mail-Adresse'),
      password: yup.string().required('Passwort ist erforderlich').min(6, 'Passwort muss mindestens 6 Zeichen lang sein'),
    };

    const registerSchema = {
      ...baseSchema,
      confirmPassword: yup.string()
        .oneOf([yup.ref('password'), null], 'Passwörter müssen übereinstimmen')
        .required('Bitte bestätige dein Passwort'),
    };

    return {
      isLoading: false,
      toast: useToastStore(),
      schema: yup.object(this.mode === 'register' ? registerSchema : baseSchema),
    };
  },
  computed: {
    submitLabel() {
      if (this.mode === 'register') {
        return this.isLoading ? 'Konto wird erstellt...' : 'Konto erstellen';
      }
      return this.isLoading ? 'Anmelden...' : 'Anmelden';
    },
  },
  methods: {
    async onSubmit(values) {
      try {
        this.isLoading = true;

        if (this.mode === 'register') {
          await createUserWithEmailAndPassword(auth, values.email, values.password);
          this.toast.success('Registrierung erfolgreich!');
          this.$router.push({ name: 'home' });
        } else {
          await signInWithEmailAndPassword(auth, values.email, values.password);
          this.toast.success('Login erfolgreich!');
          const redirectPath = this.$route.query.redirect || '/';
          this.$router.push(redirectPath);
        }

        this.isLoading = false;
      } catch (error) {
        this.isLoading = false;
        if (error.code === 'auth/invalid-credential') {
          this.toast.error('Die Zugangsdaten sind ungültig.');
        }
        else if (error.code === 'auth/email-already-in-use') {
          this.toast.error('Die E-Mail-Adresse wird bereits verwendet.');
        }
        else {
          this.toast.error(error.message);
        }
      }
    }
  },
}
</script>

<style scoped></style>
