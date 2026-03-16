import { TouchableOpacity, StyleSheet } from 'react-native';
import Animated, { useAnimatedStyle, withSpring } from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/colors';
import { Spacing } from '@/constants/typography';

interface ExerciseCheckboxProps {
  checked: boolean;
  onToggle: () => void;
}

export default function ExerciseCheckbox({ checked, onToggle }: ExerciseCheckboxProps) {
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: withSpring(checked ? 1 : 0.95) }],
  }));

  return (
    <Animated.View style={animatedStyle}>
      <TouchableOpacity
        onPress={onToggle}
        style={[styles.box, checked && styles.checked]}
        activeOpacity={0.7}
      >
        {checked && <Ionicons name="checkmark" size={16} color={Colors.white} />}
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  box: {
    width: Spacing.checkboxSize,
    height: Spacing.checkboxSize,
    borderRadius: Spacing.checkboxRadius,
    borderWidth: 2,
    borderColor: Colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checked: {
    backgroundColor: Colors.success,
    borderColor: Colors.success,
  },
});
