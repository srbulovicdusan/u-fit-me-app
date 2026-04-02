import { View, StyleSheet } from 'react-native';
import ScreenContainer from '@/components/ui/screen-container';
import TrainerHero from '@/components/trainer/trainer-hero';
import TrainerBio from '@/components/trainer/trainer-bio';
import CertificatesList from '@/components/trainer/certificates-list';
import TransformationCard from '@/components/trainer/transformation-card';
import TestimonialCard from '@/components/trainer/testimonial-card';
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
