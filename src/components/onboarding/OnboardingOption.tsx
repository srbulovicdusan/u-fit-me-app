import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Colors } from '@/constants/colors';
import { Spacing } from '@/constants/typography';

interface OnboardingOptionProps {
  label: string;
  selected: boolean;
  onPress: () => void;
}

export default function OnboardingOption({ label, selected, onPress }: OnboardingOptionProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      style={[styles.option, selected && styles.selected]}
    >
      <Text style={[styles.text, selected && styles.selectedText]}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  option: {
    padding: 15,
    paddingHorizontal: 20,
    borderRadius: Spacing.cardRadius,
    borderWidth: 1.5,
    borderColor: Colors.border,
    backgroundColor: Colors.card,
    marginBottom: 10,
  },
  selected: {
    borderWidth: 2,
    borderColor: Colors.primary,
    backgroundColor: Colors.primaryLight,
  },
  text: {
    fontSize: 15,
    color: Colors.text,
  },
  selectedText: {
    fontWeight: '600',
    color: Colors.primaryDark,
  },
});
