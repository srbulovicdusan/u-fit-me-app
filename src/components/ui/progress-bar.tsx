import { View, StyleSheet } from 'react-native';
import Animated, { useAnimatedStyle, withTiming } from 'react-native-reanimated';
import { Colors } from '@/constants/colors';
import { Spacing } from '@/constants/typography';

interface ProgressBarProps {
  progress: number; // 0 to 1
  color?: string;
}

export default function ProgressBar({ progress, color = Colors.success }: ProgressBarProps) {
  const animatedStyle = useAnimatedStyle(() => ({
    width: withTiming(`${Math.min(progress, 1) * 100}%`, { duration: 400 }),
  }));

  return (
    <View style={styles.track}>
      <Animated.View style={[styles.fill, { backgroundColor: color }, animatedStyle]} />
    </View>
  );
}

const styles = StyleSheet.create({
  track: {
    height: Spacing.progressBarHeight,
    borderRadius: 999,
    backgroundColor: Colors.primaryLight,
    overflow: 'hidden',
  },
  fill: {
    height: '100%',
    borderRadius: 2,
  },
});
