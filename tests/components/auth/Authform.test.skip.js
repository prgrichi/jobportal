// import { describe, it, expect, beforeEach, vi } from 'vitest';
// import { mount } from '@vue/test-utils';
// import { createI18n } from 'vue-i18n';
// import { createPinia, setActivePinia } from 'pinia';
// import AuthForm from '@/components/auth/AuthForm.vue';

// const mockSignInWithEmailAndPassword = vi.fn();

// // Modul 'firebase/auth' mocken
// vi.mock('firebase/auth', () => ({
//   signInWithEmailAndPassword: (...args) => mockSignInWithEmailAndPassword(...args),
// }));

// // auth-Objekt, das in AuthForm importiert wird
// vi.mock('@/config/firebase', () => ({
//   auth: {}, // Dummy; wir brauchen nur irgendein Objekt
// }));

// // Auth-Store Mock
// const mockCreateUserDocument = vi.fn();
// const mockAuthStore = {
//   createUserDocument: mockCreateUserDocument,
// };

// vi.mock('@/stores/auth/auth', () => ({
//   useAuthStore: () => mockAuthStore,
// }));

// // Toast-Store Mock
// const mockToast = {
//   success: vi.fn(),
//   error: vi.fn(),
// };

// vi.mock('@/stores/toast/toast', () => ({
//   useToastStore: () => mockToast,
// }));

// // Router & Route Mocks
// const pushMock = vi.fn();

// const routerMock = {
//   push: pushMock,
// };

// const routeMock = {
//   query: {}, // pro Test können wir das anpassen
// };

// const createWrapper = (props = {}) => {
//   return mount(AuthForm, {
//     props: { mode: 'login', ...props },
//     global: {
//       plugins: [
//         createI18n({
//           legacy: false,
//           locale: 'de',
//           messages: { de: {} }, // leer: t('...') -> gibt im Zweifel den Key zurück
//         }),
//       ],
//       stubs: {
//         Icon: true, // wir brauchen das Icon nicht im Test
//       },
//       mocks: {
//         $router: routerMock,
//         $route: routeMock,
//       },
//     },
//   });
// };

// const submitLoginForm = async (
//   wrapper,
//   { email = 'login@example.com', password = 'mypassword' } = {}
// ) => {
//   await wrapper.find('#email').setValue(email);
//   await wrapper.find('#password').setValue(password);
//   await wrapper.find('form').trigger('submit.prevent');
// };

// describe('AuthForm - login mode', () => {
//   beforeEach(() => {
//     // Pinia aktivieren (für useAuthStore, auch wenn wir es mocken)
//     setActivePinia(createPinia());
//     // alle Mocks zurücksetzen
//     vi.clearAllMocks();
//     // Standard: kein redirect-Query
//     routeMock.query = {};
//   });

//   it('does not show confirm password field in login mode', () => {
//     const wrapper = createWrapper({ mode: 'login' });

//     // Kein confirmPassword-Feld im Login-Modus
//     expect(wrapper.find('#confirmPassword').exists()).toBe(false);
//   });

//   it('toggles password visibility in login mode', async () => {
//     const wrapper = createWrapper({ mode: 'login' });

//     const passwordInput = wrapper.find('#password');
//     // erster Button[type=button] ist der Toggle fürs Passwort
//     const toggleBtn = wrapper.findAll('button[type="button"]')[0];

//     // Start: Passwort versteckt
//     expect(passwordInput.attributes('type')).toBe('password');

//     await toggleBtn.trigger('click');
//     expect(passwordInput.attributes('type')).toBe('text');

//     await toggleBtn.trigger('click');
//     expect(passwordInput.attributes('type')).toBe('password');
//   });

//   it('logs in user and redirects to / on success', async () => {
//     // Fake-User, den Firebase zurückgeben soll
//     const fakeUser = { uid: 'abc' };

//     // signInWithEmailAndPassword soll ein Promise mit { user: fakeUser } zurückgeben
//     mockSignInWithEmailAndPassword.mockResolvedValueOnce({
//       user: fakeUser,
//     });

//     const wrapper = createWrapper({ mode: 'login' });

//     await submitLoginForm(wrapper, {
//       email: 'login@example.com',
//       password: 'mypassword',
//     });

//     // 1. Firebase-Funktion wurde korrekt aufgerufen
//     expect(mockSignInWithEmailAndPassword).toHaveBeenCalledWith(
//       expect.anything(), // auth (Dummy aus unserem Mock)
//       'login@example.com',
//       'mypassword'
//     );

//     // 2. Auth-Store wurde mit dem User aufgerufen
//     expect(mockCreateUserDocument).toHaveBeenCalledWith(fakeUser);

//     // 3. Erfolg-Toast wurde gezeigt
//     expect(mockToast.success).toHaveBeenCalled();

//     // 4. Redirect auf '/', weil kein redirect-Query gesetzt war
//     expect(pushMock).toHaveBeenCalledWith('/');

//     // 5. Loading wurde wieder auf false gesetzt
//     expect(wrapper.vm.isLoading).toBe(false);
//   });
// });
