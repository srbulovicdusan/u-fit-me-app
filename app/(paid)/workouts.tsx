import { useMemo } from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import ScreenContainer from '@/components/ui/screen-container';
import WorkoutCalendar from '@/components/workout/workout-calendar';
import DayActivityCard from '@/components/workout/day-activity-card';
import { useCalendarWorkouts } from '@/hooks/use-calendar-workouts';
import { Colors } from '@/constants/colors';
import { Typography, Spacing } from '@/constants/typography';

const DAY_NAMES_FULL = [
  'Ponedeljak', 'Utorak', 'Sreda', 'Četvrtak', 'Petak', 'Subota', 'Nedelja',
];

function toMondayIndex(jsDay: number): number {
  return jsDay === 0 ? 6 : jsDay - 1;
}

export default function WorkoutsScreen() {
  const {
    monthLabel,
    calendarWeeks,
    currentWeekIndex,
    selectedDate,
    setSelectedDate,
    selectedDayInfo,
    goToPrevMonth,
    goToNextMonth,
    isLoading,
    dayHeaders,
  } = useCalendarWorkouts();

  const selectedDayName = useMemo(
    () => DAY_NAMES_FULL[toMondayIndex(selectedDate.getDay())],
    [selectedDate],
  );

  function handleViewWorkout() {
    if (!selectedDayInfo?.workoutDayId) return;
    router.push({ pathname: '/workout/detail', params: { dayId: selectedDayInfo.workoutDayId } });
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
      <View style={styles.header}>
        <Text style={styles.title}>Treninzi</Text>
      </View>

      <WorkoutCalendar
        monthLabel={monthLabel}
        calendarWeeks={calendarWeeks}
        currentWeekIndex={currentWeekIndex}
        dayHeaders={dayHeaders}
        onSelectDate={setSelectedDate}
        onPrevMonth={goToPrevMonth}
        onNextMonth={goToNextMonth}
      />

      <DayActivityCard
        dayInfo={selectedDayInfo}
        dayName={selectedDayName}
        onViewWorkout={handleViewWorkout}
      />
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
