import { router } from 'expo-router';
import ScreenContainer from '@/components/ui/ScreenContainer';
import HomeHeader from '@/components/home/HomeHeader';
import StreakRow from '@/components/home/StreakRow';
import TodayWorkoutCard from '@/components/home/TodayWorkoutCard';
import TrainerNote from '@/components/home/TrainerNote';
import WeekOverview from '@/components/workout/WeekOverview';
import { WEEK_PLAN } from '@/data/workouts';

export default function HomePaidScreen() {
  const todayWorkout = WEEK_PLAN.find(d => d.today);

  function handleStartWorkout() {
    if (todayWorkout) {
      router.push({ pathname: '/workout/active', params: { dayIndex: WEEK_PLAN.indexOf(todayWorkout).toString() } });
    }
  }

  return (
    <ScreenContainer>
      <HomeHeader greeting="Zdravo! 💪" />
      <StreakRow />
      {todayWorkout && (
        <TodayWorkoutCard
          name={todayWorkout.name}
          exerciseCount={todayWorkout.exercises.length}
          duration={todayWorkout.duration}
          onStart={handleStartWorkout}
        />
      )}
      <TrainerNote message={'"Danas se fokusiraj na kontrolisan pokret. Bolje je raditi sporije sa pravilnom formom nego brzo i neprecizno!" 🎯'} />
      <WeekOverview weekPlan={WEEK_PLAN} />
    </ScreenContainer>
  );
}
