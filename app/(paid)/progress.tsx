import { View, Text, StyleSheet } from 'react-native';
import ScreenContainer from '@/components/ui/ScreenContainer';
import MeasurementsGrid from '@/components/progress/MeasurementsGrid';
import WeightChart from '@/components/progress/WeightChart';
import PhotoDiary from '@/components/progress/PhotoDiary';
import StreakBanner from '@/components/progress/StreakBanner';
import { useProgress } from '@/hooks/useProgress';
import { Colors } from '@/constants/colors';
import { Typography, Spacing } from '@/constants/typography';

export default function ProgressScreen() {
  const { measurements } = useProgress();

  return (
    <ScreenContainer>
      <View style={styles.header}>
        <Text style={styles.title}>Napredak</Text>
      </View>
      <MeasurementsGrid measurements={measurements} />
      <WeightChart />
      <PhotoDiary />
      <StreakBanner />
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: Spacing.screenPadding,
    paddingTop: Spacing.lg,
    paddingBottom: Spacing.sm,
  },
  title: {
    ...Typography.h1Display,
    color: Colors.text,
  },
});
