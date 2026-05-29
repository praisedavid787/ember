// Palette per assessment brief: white background, grey, black, red accent.
// Centralised so every screen pulls from one source — no scattered hex codes.

export const colors = {
  background: '#FFFFFF',
  surface: '#FAFAFA',
  border: '#ECECEC',
  textPrimary: '#0A0A0A',
  textSecondary: '#6B6B6B',
  textMuted: '#A0A0A0',
  accent: '#E5383B',
  accentMuted: '#FFD6D7',
  shadow: 'rgba(0, 0, 0, 0.08)',
} as const;

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
} as const;

export const radii = {
  sm: 8,
  md: 16,
  lg: 24,
  pill: 999,
} as const;

export const typography = {
  display: { fontSize: 32, fontWeight: '700' as const, letterSpacing: -0.5 },
  title: { fontSize: 22, fontWeight: '700' as const },
  body: { fontSize: 16, fontWeight: '400' as const },
  caption: { fontSize: 13, fontWeight: '400' as const },
  button: { fontSize: 16, fontWeight: '600' as const },
} as const;
