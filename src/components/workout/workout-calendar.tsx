import { useCallback } from 'react';
import { View, Text, TouchableOpacity, Pressable, StyleSheet } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';
import { ChevronLeft, ChevronRight, Check } from 'lucide-react-native';
import Card from '@/components/ui/card';
import { Colors } from '@/constants/colors';
import { Typography, Spacing } from '@/constants/typography';
import type { CalendarDayInfo } from '@/types';

const SNAP_THRESHOLD = 0.4;
const SPRING_CONFIG = { damping: 20, stiffness: 200, mass: 0.5 };

interface WorkoutCalendarProps {
  monthLabel: string;
  calendarWeeks: CalendarDayInfo[][];
  currentWeekIndex: number;
  dayHeaders: string[];
  onSelectDate: (date: Date) => void;
  onPrevMonth: () => void;
  onNextMonth: () => void;
}

export default function WorkoutCalendar({
  monthLabel,
  calendarWeeks,
  currentWeekIndex,
  dayHeaders,
  onSelectDate,
  onPrevMonth,
  onNextMonth,
}: WorkoutCalendarProps) {
  const totalRows = calendarWeeks.length;
  const rowHeight = 52;
  const borderPadding = 2;
  const collapsedHeight = rowHeight + borderPadding;
  const expandedHeight = rowHeight * totalRows + borderPadding;
  const extraHeight = expandedHeight - collapsedHeight;

  // 0 = collapsed, 1 = expanded
  const progress = useSharedValue(0);
  const startProgress = useSharedValue(0);

  const panGesture = Gesture.Pan()
    .onStart(() => {
      startProgress.value = progress.value;
    })
    .onUpdate((e) => {
      const delta = e.translationY / extraHeight;
      const next = startProgress.value + delta;
      progress.value = Math.max(0, Math.min(1, next));
    })
    .onEnd((e) => {
      const delta = e.translationY / extraHeight;
      const projected = startProgress.value + delta;

      // Snap based on direction + threshold
      if (delta > 0) {
        // Swiping down → expand if past threshold
        progress.value = withSpring(
          projected > startProgress.value + SNAP_THRESHOLD ? 1 : startProgress.value > 0.5 ? 1 : 0,
          SPRING_CONFIG,
        );
      } else {
        // Swiping up → collapse if past threshold
        progress.value = withSpring(
          projected < startProgress.value - SNAP_THRESHOLD ? 0 : startProgress.value > 0.5 ? 1 : 0,
          SPRING_CONFIG,
        );
      }
    });

  const tapGesture = Gesture.Tap().onEnd(() => {
    'worklet';
    progress.value = withSpring(progress.value < 0.5 ? 1 : 0, SPRING_CONFIG);
  });

  const gridAnimatedStyle = useAnimatedStyle(() => ({
    height: collapsedHeight + extraHeight * progress.value,
    overflow: 'hidden' as const,
  }));

  // Calculate the offset to keep the current week visible when collapsed
  const scrollOffset = useAnimatedStyle(() => ({
    transform: [
      {
        translateY: -currentWeekIndex * rowHeight * (1 - progress.value),
      },
    ],
  }));

  const handleDayPress = useCallback(
    (date: Date) => {
      onSelectDate(date);
    },
    [onSelectDate],
  );

  return (
    <GestureDetector gesture={panGesture}>
      <Animated.View>
        <Card style={styles.card}>
          {/* Month header */}
          <View style={styles.header}>
            <TouchableOpacity onPress={onPrevMonth} hitSlop={12}>
              <ChevronLeft size={20} color={Colors.text} />
            </TouchableOpacity>
            <Text style={styles.monthLabel}>{monthLabel}</Text>
            <TouchableOpacity onPress={onNextMonth} hitSlop={12}>
              <ChevronRight size={20} color={Colors.text} />
            </TouchableOpacity>
          </View>

          {/* Day headers */}
          <View style={styles.weekRow}>
            {dayHeaders.map((h, i) => (
              <View key={i} style={styles.cell}>
                <Text style={styles.dayHeader}>{h}</Text>
              </View>
            ))}
          </View>

          {/* Calendar grid — animated height */}
          <Animated.View style={gridAnimatedStyle}>
            <Animated.View style={scrollOffset}>
              {calendarWeeks.map((week, wi) => (
                <View key={wi} style={styles.weekRow}>
                  {week.map((day, di) => (
                    <Pressable
                      key={di}
                      style={[
                        styles.cell,
                        styles.dayCell,
                        day.isSelected && styles.selectedCell,
                        day.isToday && !day.isSelected && styles.todayCell,
                      ]}
                      onPress={() => handleDayPress(day.date)}
                    >
                      <Text
                        style={[
                          styles.dayText,
                          !day.isCurrentMonth && styles.otherMonthText,
                          day.isSelected && styles.selectedText,
                        ]}
                      >
                        {day.dayOfMonth}
                      </Text>
                      <DayIndicator day={day} />
                    </Pressable>
                  ))}
                </View>
              ))}
            </Animated.View>
          </Animated.View>

          {/* Swipe bar — tap to toggle */}
          <GestureDetector gesture={tapGesture}>
            <Animated.View style={styles.swipeBarContainer}>
              <View style={styles.swipeBar} />
            </Animated.View>
          </GestureDetector>
        </Card>
      </Animated.View>
    </GestureDetector>
  );
}

function DayIndicator({ day }: { day: CalendarDayInfo }) {
  if (!day.isCurrentMonth) return <View style={styles.indicatorPlaceholder} />;

  if (day.isCompleted) {
    return (
      <View style={styles.indicatorContainer}>
        <Check size={10} color={Colors.primary} strokeWidth={3} />
      </View>
    );
  }

  if (day.isWorkoutDay && day.isSelected) {
    return <View style={[styles.dot, { backgroundColor: Colors.primary }]} />;
  }

  if (day.isWorkoutDay && !day.isSelected) {
    return <View style={[styles.dot, { backgroundColor: Colors.accent }]} />;
  }

  return <View style={styles.indicatorPlaceholder} />;
}

const styles = StyleSheet.create({
  card: {
    paddingVertical: Spacing.lg,
    paddingBottom: Spacing.lg,
    paddingTop: Spacing.xl,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: Spacing.md,
    paddingHorizontal: 8,
  },
  monthLabel: {
    ...Typography.h3,
    color: Colors.text,
  },
  weekRow: {
    flexDirection: 'row',
    gap: 8,
    width: '100%',
  },
  cell: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: 8,
    paddingVertical: 2,
  },
  dayHeader: {
    ...Typography.tiny,
    color: Colors.muted,
    fontWeight: '600',
    marginBottom: 6,
  },
  dayCell: {
    paddingVertical: 6,
    borderRadius: 8,
    borderWidth: 1.5,
    borderColor: 'transparent',
    height: 52,
  },
  selectedCell: {
    backgroundColor: Colors.primaryLight,
    borderColor: Colors.primary,
  },
  todayCell: {
    borderColor: Colors.primary,
  },
  dayText: {
    ...Typography.small,
    color: Colors.text,
    textAlign: 'center',
  },
  otherMonthText: {
    color: Colors.muted,
  },
  selectedText: {
    fontWeight: '700',
    color: Colors.text,
  },
  indicatorContainer: {
    height: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 1,
  },
  indicatorPlaceholder: {
    height: 12,
    marginTop: 1,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 999,
  },
  swipeBarContainer: {
    alignItems: 'center',
    paddingTop: Spacing.lg,
  },
  swipeBar: {
    width: 64,
    height: 4,
    borderRadius: 2,
    backgroundColor: Colors.textSecondary,
    opacity: 40,
  },
});
