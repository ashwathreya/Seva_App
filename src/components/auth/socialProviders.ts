import { Platform } from 'react-native';

export type SocialProviderId =
  | 'google'
  | 'apple'
  | 'facebook'
  | 'microsoft'
  | 'x'
  | 'phone';

export type SocialProviderConfig = {
  id: SocialProviderId;
  label: string;
  /** Short glyph inside the icon slot (brand colors applied in UI). */
  glyph: string;
  bg: string;
  text: string;
  borderColor?: string;
  /** Omit on unsupported platforms (e.g. native Apple button on iOS only). */
  platforms?: ReadonlyArray<'ios' | 'android' | 'windows' | 'macos' | 'web'>;
};

export const SOCIAL_PROVIDERS: SocialProviderConfig[] = [
  {
    id: 'google',
    label: 'Continue with Google',
    glyph: 'G',
    bg: '#FFFFFF',
    text: '#1F1F1F',
    borderColor: 'rgba(0,0,0,0.08)',
  },
  {
    id: 'apple',
    label: 'Continue with Apple',
    glyph: '',
    bg: '#000000',
    text: '#FFFFFF',
    platforms: ['ios'],
  },
  {
    id: 'facebook',
    label: 'Continue with Facebook',
    glyph: 'F',
    bg: '#0866FF',
    text: '#FFFFFF',
  },
  {
    id: 'microsoft',
    label: 'Continue with Microsoft',
    glyph: 'M',
    bg: '#2F2F2F',
    text: '#FFFFFF',
  },
  {
    id: 'x',
    label: 'Continue with X',
    glyph: 'X',
    bg: '#000000',
    text: '#FFFFFF',
  },
  {
    id: 'phone',
    label: 'Continue with phone',
    glyph: '+',
    bg: 'transparent',
    text: '#EAF3F3',
    borderColor: 'rgba(255,255,255,0.22)',
  },
];

export function providersForPlatform(): SocialProviderConfig[] {
  return SOCIAL_PROVIDERS.filter(
    (p) => !p.platforms || p.platforms.includes(Platform.OS),
  );
}
