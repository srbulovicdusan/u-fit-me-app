import { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import ScreenContainer from '@/components/ui/ScreenContainer';
import WorkoutDayCard from '@/components/workout/WorkoutDayCard';
import CalendarGrid from '@/components/calendar/CalendarGrid';
import CalendarLegend from '@/components/calendar/CalendarLegend';
import { WEEK_PLAN } from '@/data/workouts';
import { Colors } from '@/constants/colors';
import { Typography, Spacing } from '@/constants/typography';

type ViewMode = 'plan' | 'calendar';

export default function WorkoutsScreen() {
  const [view, setView] = useState<ViewMode>('plan');

  function handleStart() {
    const todayIndex = WEEK_PLAN.findIndex(d => d.today);
    router.push({ pathname: '/workout/active', params: { dayIndex: todayIndex.toString() } });
  }

  return (
    <ScreenContainer>
      <View style={styles.header}>
        <Text style={styles.title}>Treninzi</Text>
        <View style={styles.toggle}>
          {(['plan', 'calendar'] as ViewMode[]).map(v => (
            <TouchableOpacity key={v} onPress={() => setView(v)} style={[styles.tab, view === v && styles.tabActive]}>
              <Text style={[styles.tabText, view === v && styles.tabTextActive]}>
                {v === 'plan' ? 'Plan' : 'Kalendar'}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {view === 'plan' ? (
        <View style={styles.planList}>
          {WEEK_PLAN.map((day, i) => (
            <WorkoutDayCard key={i} day={day} onStart={day.today ? handleStart : undefined} />
          ))}
        </View>
      ) : (
        <>
          <CalendarGrid />
          <CalendarLegend />
        </>
      )}
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Spacing.screenPadding,
    paddingTop: Spacing.lg,
    paddingBottom: Spacing.sm,
  },
  title: {
    ...Typography.h1Display,
    color: Colors.text,
  },
  toggle: {
    flexDirection: 'row',
    backgroundColor: Colors.borderLight,
    borderRadius: 8,
    padding: 2,
  },
  tab: {
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 6,
  },
  tabActive: {
    backgroundColor: Colors.card,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 3,
    elevation: 1,
  },
  tabText: {
    fontSize: 12,
    fontWeight: '500',
    color: Colors.muted,
  },
  tabTextActive: {
    color: Colors.text,
  },
  planList: {
    paddingHorizontal: Spacing.screenPadding,
    paddingTop: Spacing.sm,
    paddingBottom: Spacing.xl,
  },
});
