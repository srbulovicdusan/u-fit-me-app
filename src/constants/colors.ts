export const Colors = {
  // Backgrounds
  bg: '#F7F3EF',
  bgSecondary: '#EFE8E1',
  card: '#FFFFFF',

  // Primary
  primary: '#8FAF9A',
  primaryPressed: '#7C9E89',
  primaryLight: '#DCE8E1',

  // Secondary
  accent: '#D6A6A1',
  accentPressed: '#C48F8A',
  accentLight: '#F1DDDB',

  // Success
  success: '#8FAF9A',
  successLight: '#DCE8E1',

  // Text
  text: '#2F2F2F',
  textSecondary: '#6B6B6B',
  muted: '#A8A8A8',

  // Borders
  border: '#E4DDD6',
  borderLight: '#EFE8E1',

  // Grey
  grey10: '#1A1A1A',

  // Other
  highlight: '#DCE8E1',
  danger: '#C4574B',
  dangerLight: '#FDEDED',
  white: '#FFFFFF',
  black: '#1A1A1A',
} as const;

export const Shadows = {
  card: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 1,
  },
  none: {
    shadowColor: 'transparent',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0,
    shadowRadius: 0,
    elevation: 0,
  },
} as const;

export type ColorKey = keyof typeof Colors;
