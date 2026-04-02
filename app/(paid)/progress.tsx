import { View, Text, StyleSheet } from 'react-native';
import ScreenContainer from '@/components/ui/screen-container';
import MeasurementsGrid from '@/components/progress/measurements-grid';
import WeightChart from '@/components/progress/weight-chart';
import PhotoDiary from '@/components/progress/photo-diary';
import StreakBanner from '@/components/progress/streak-banner';
import { useProgress } from '@/hooks/use-progress';
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
