export const Colors = {
  // Backgrounds
  bg: '#FAFAF7',
  card: '#FFFFFF',

  // Primary
  primary: '#8B6E4E',
  primaryLight: '#F5EDE4',
  primaryDark: '#5C452E',

  // Accent
  accent: '#C47B5A',
  accentLight: '#FDF0EB',

  // Success
  success: '#4A8C6F',
  successLight: '#E8F5EE',

  // Text
  text: '#2C2A26',
  textSecondary: '#6B6860',
  muted: '#94918A',

  // Borders
  border: '#E8E6E0',
  borderLight: '#F0EEE8',

  // Other
  highlight: '#E8DDD0',
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
