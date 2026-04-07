import { Alert } from 'react-native';

/** UI-only: wire to Firebase / Auth0 / native SDKs in production. */
export function showSocialSignInStub(providerLabel: string) {
  Alert.alert(
    'Sign-in provider',
    `${providerLabel} is not connected in this build. Hook it to your auth backend (e.g. Firebase Auth, Auth0, Supabase, or the official Google, Apple, Facebook, Microsoft, and X SDKs).`,
    [{ text: 'OK' }],
  );
}
