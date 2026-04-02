import { ActivityIndicator } from 'react-native';
import { router } from 'expo-router';
import ScreenContainer from '@/components/ui/screen-container';
import HomeHeader from '@/components/home/home-header';
import TodayWorkoutCard from '@/components/home/today-workout-card';
import TrainerNote from '@/components/home/trainer-note';
import WeekOverview from '@/components/workout/week-overview';
import WeeklyProgress from '@/components/home/weekly-progress';
import { useUserWorkoutWeek } from '@/hooks/use-user-workout-week';
import { Colors } from '@/constants/colors';

export default function HomePaidScreen() {
  const { weekDays: weekPlan, done, total, remaining, progress, isLoading } = useUserWorkoutWeek();
  const todayWorkout = weekPlan.find(d => d.today);

  function handleStartWorkout() {
    if (todayWorkout) {
      router.push({ pathname: '/workout/detail', params: { dayId: todayWorkout.dayId } });
    }
  }

  if (isLoading) {
    return (
      <ScreenContainer>
        <ActivityIndicator size="large" color={Colors.primary} style={{ flex: 1 }} />
      </ScreenContainer>
    );
  }

  return (
    <ScreenContainer>
      <HomeHeader greeting="Zdravo! 💪" />
      {todayWorkout && !todayWorkout.rest && (
        <TodayWorkoutCard
          name={todayWorkout.name}
          exerciseCount={todayWorkout.exercises.length}
          duration={todayWorkout.duration}
          onStart={handleStartWorkout}
        />
      )}
      <TrainerNote message={'"Danas se fokusiraj na kontrolisan pokret. Bolje je raditi sporije sa pravilnom formom nego brzo i neprecizno!" 🎯'} />
      <WeeklyProgress done={done} total={total} remaining={remaining} progress={progress} />
      <WeekOverview weekPlan={weekPlan} />
    </ScreenContainer>
  );
}
