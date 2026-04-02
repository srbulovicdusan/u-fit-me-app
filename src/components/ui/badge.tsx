import { View, Text, StyleSheet } from 'react-native';
import { Colors } from '@/constants/colors';
import { Typography, Spacing } from '@/constants/typography';

type BadgeVariant = 'primary' | 'accent';

interface BadgeProps {
  text: string;
  variant?: BadgeVariant;
  icon?: React.ReactNode;
  color?: string;
  bgColor?: string;
}

const VARIANT_STYLES = {
  primary: {
    bg: Colors.primaryLight,
    text: Colors.primary,
    border: Colors.primary,
  },
  accent: {
    bg: Colors.accentLight,
    text: Colors.accent,
    border: Colors.accent,
  },
};

export default function Badge({ text, variant, icon, color, bgColor }: BadgeProps) {
  if (variant) {
    const v = VARIANT_STYLES[variant];
    return (
      <View style={[styles.variantContainer, { backgroundColor: v.bg, borderColor: v.border }]}>
        {icon && <View style={styles.icon}>{icon}</View>}
        <Text style={[styles.variantText, { color: v.text }]}>{text}</Text>
      </View>
    );
  }

  return (
    <Text style={[styles.badge, { color: color ?? Colors.primary, backgroundColor: bgColor ?? Colors.primaryLight }]}>
      {text}
    </Text>
  );
}

const styles = StyleSheet.create({
  badge: {
    ...Typography.badge,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: Spacing.badgeRadius,
    overflow: 'hidden',
  },
  variantContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 999,
    borderWidth: 1,
    gap: 4,
  },
  icon: {
    marginRight: 2,
  },
  variantText: {
    fontSize: 13,
    fontFamily: 'Inter_500Medium',
  },
});
