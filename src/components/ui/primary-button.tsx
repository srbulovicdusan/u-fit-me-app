import { TouchableOpacity, Text, ActivityIndicator, StyleSheet, type ViewStyle } from 'react-native';
import { Colors } from '@/constants/colors';
import { Typography, Spacing } from '@/constants/typography';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'success' | 'ghost';

interface PrimaryButtonProps {
  title: string;
  onPress: () => void;
  variant?: ButtonVariant;
  disabled?: boolean;
  loading?: boolean;
  style?: ViewStyle;
}

const VARIANT_STYLES: Record<ButtonVariant, { bg: string; text: string; border?: string }> = {
  primary: { bg: Colors.primary, text: Colors.white },
  secondary: { bg: Colors.accent, text: Colors.white },
  outline: { bg: Colors.card, text: Colors.textSecondary, border: Colors.border },
  success: { bg: Colors.success, text: Colors.white },
  ghost: { bg: 'transparent', text: Colors.textSecondary, border: Colors.border },
};

export default function PrimaryButton({ title, onPress, variant = 'primary', disabled, loading, style }: PrimaryButtonProps) {
  const v = VARIANT_STYLES[variant];

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.7}
      style={[
        styles.button,
        { backgroundColor: disabled ? Colors.border : v.bg },
        v.border ? { borderWidth: 1.5, borderColor: v.border } : undefined,
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator color={v.text} size="small" />
      ) : (
        <Text style={[styles.text, { color: disabled ? Colors.muted : v.text }]}>
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: 14,
    paddingHorizontal: Spacing.xl,
    borderRadius: Spacing.buttonRadiusLg,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: Spacing.minTouchTarget,
  },
  text: {
    ...Typography.cta,
  },
});
