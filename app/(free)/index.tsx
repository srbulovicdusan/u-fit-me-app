import { router } from 'expo-router';
import ScreenContainer from '@/components/ui/screen-container';
import HomeHeader from '@/components/home/home-header';
import FreeWorkoutCard from '@/components/home/free-workout-card';
import ProgramCarousel from '@/components/home/program-carousel';
import PackageCtaCard from '@/components/home/package-cta-card';
import TestimonialsCarousel from '@/components/home/testimonials-carousel';
import { useFreeTraining } from '@/hooks/use-free-training';
import { useAuth } from '@/hooks/use-auth';
import { APP_NAME } from '@/constants/strings';

export default function HomeFreeScreen() {
  const { session, profile } = useAuth();
  const { workout, isLoading } = useFreeTraining();


  function handleStartWorkout() {
    if (workout?.dayId) {
      router.push({ pathname: '/workout/detail', params: { dayId: workout.dayId } });
    }
  }

  return (
    <ScreenContainer>
      <HomeHeader greeting="Tvoj prvi trening je spreman" />
      <FreeWorkoutCard workout={workout} isLoading={isLoading} onStart={handleStartWorkout} />
      <ProgramCarousel />
      <PackageCtaCard onPress={() => router.push('/(free)/packages')} buttonText="Započni trening" />
      <TestimonialsCarousel />
    </ScreenContainer>
  );
}
