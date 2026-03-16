import { View, StyleSheet } from 'react-native';
import ScreenContainer from '@/components/ui/ScreenContainer';
import TrainerHero from '@/components/trainer/TrainerHero';
import TrainerBio from '@/components/trainer/TrainerBio';
import CertificatesList from '@/components/trainer/CertificatesList';
import TransformationCard from '@/components/trainer/TransformationCard';
import TestimonialCard from '@/components/trainer/TestimonialCard';
import { TRANSFORMATIONS } from '@/data/workouts';
import { Spacing } from '@/constants/typography';

export default function TrainerScreen() {
  return (
    <ScreenContainer edges={['bottom']}>
      <TrainerHero />
      <View style={styles.content}>
        <TrainerBio />
        <CertificatesList />
        {TRANSFORMATIONS.map((t, i) => (
          <TransformationCard key={i} transformation={t} />
        ))}
        <TestimonialCard />
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingTop: Spacing.lg,
  },
});
