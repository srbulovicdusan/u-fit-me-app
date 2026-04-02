import { View, StyleSheet, type ViewStyle } from 'react-native';
import { Colors, Shadows } from '@/constants/colors';
import { Spacing } from '@/constants/typography';
import type { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  style?: ViewStyle;
}

export default function Card({ children, style }: CardProps) {
  return (
    <View style={[styles.card, style]}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.card,
    borderRadius: Spacing.cardRadius,
    borderWidth: 1,
    borderColor: Colors.border,
    padding: Spacing.cardPadding,
    marginHorizontal: Spacing.screenPadding,
    marginVertical: Spacing.cardMargin,
    ...Shadows.card,
  },
});
