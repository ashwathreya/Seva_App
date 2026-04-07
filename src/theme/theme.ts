/**
 * SEVA design tokens — brand teal must stay #0F3D3E (splash / welcome).
 */
export const colors = {
  brandTeal: '#0F3D3E',
  brandGold: '#F0A500',
  ink: '#EAF3F3',
  muted: '#A7B9BA',
  surface: '#071F20',
  surfaceSubtle: '#0D2E30',
  border: 'rgba(255,255,255,0.14)',
  ghostBorder: 'rgba(255,255,255,0.24)',
  ghostBg: 'rgba(255,255,255,0.1)',
  success: '#0D6E4E',
  danger: '#B42318',
} as const;

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
} as const;

export const radius = {
  sm: 8,
  md: 12,
  lg: 16,
  full: 9999,
} as const;

export const typography = {
  title: { fontSize: 22, fontWeight: '800' as const },
  heading: { fontSize: 18, fontWeight: '700' as const },
  body: { fontSize: 15, fontWeight: '400' as const },
  bodyStrong: { fontSize: 15, fontWeight: '600' as const },
  caption: { fontSize: 13, fontWeight: '400' as const },
  small: { fontSize: 12, fontWeight: '500' as const },
} as const;

export type Theme = {
  colors: typeof colors;
  spacing: typeof spacing;
  radius: typeof radius;
  typography: typeof typography;
};

export const theme: Theme = { colors, spacing, radius, typography };
