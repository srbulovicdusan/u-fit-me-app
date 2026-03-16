import { Platform, TextStyle } from 'react-native';

const serif = Platform.OS === 'ios' ? 'Georgia' : 'serif';

export const Typography = {
  // Display / Brand
  logo: {
    fontFamily: serif,
    fontSize: 48,
    fontWeight: '700',
  } as TextStyle,
  h1Display: {
    fontFamily: serif,
    fontSize: 22,
    fontWeight: '700',
  } as TextStyle,

  // Headings
  h2: {
    fontSize: 18,
    fontWeight: '600',
  } as TextStyle,
  h3: {
    fontSize: 15,
    fontWeight: '600',
  } as TextStyle,

  // Body
  body: {
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 21,
  } as TextStyle,
  bodyLarge: {
    fontSize: 15,
    fontWeight: '400',
    lineHeight: 22.5,
  } as TextStyle,

  // Secondary
  description: {
    fontSize: 13,
    fontWeight: '400',
    lineHeight: 19.5,
  } as TextStyle,
  small: {
    fontSize: 12,
    fontWeight: '400',
  } as TextStyle,
  tiny: {
    fontSize: 11,
    fontWeight: '400',
  } as TextStyle,

  // Labels
  labelUppercase: {
    fontSize: 11,
    fontWeight: '600',
    letterSpacing: 1.2,
    textTransform: 'uppercase',
  } as TextStyle,
  badge: {
    fontSize: 10,
    fontWeight: '600',
  } as TextStyle,

  // Interactive
  cta: {
    fontSize: 15,
    fontWeight: '600',
  } as TextStyle,
  ctaLarge: {
    fontSize: 16,
    fontWeight: '600',
  } as TextStyle,
  tabLabel: {
    fontSize: 10,
  } as TextStyle,
};

export const Spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 28,

  // Specific
  screenPadding: 20,
  cardPadding: 16,
  cardMargin: 8,
  cardRadius: 14,
  cardRadiusLg: 16,
  buttonRadius: 12,
  buttonRadiusLg: 14,
  badgeRadius: 6,
  checkboxSize: 28,
  checkboxRadius: 8,
  iconSize: 22,
  avatarLg: 88,
  avatarMd: 52,
  avatarSm: 36,
  progressBarHeight: 4,
  minTouchTarget: 44,
} as const;
