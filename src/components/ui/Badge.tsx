import { Text, StyleSheet } from 'react-native';
import { Colors } from '@/constants/colors';
import { Typography, Spacing } from '@/constants/typography';

interface BadgeProps {
  text: string;
  color?: string;
  bgColor?: string;
}

export default function Badge({ text, color = Colors.primary, bgColor = Colors.primaryLight }: BadgeProps) {
  return (
    <Text style={[styles.badge, { color, backgroundColor: bgColor }]}>
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
});
