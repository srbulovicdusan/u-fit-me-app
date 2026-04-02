export interface Exercise {
  id: string;
  workoutDayExerciseId?: string;
  name: string;
  sets: string;
  done: boolean;
  videoUrl?: string;
  coverUrl?: string;
  techniqueTips?: string;
}

export interface WorkoutDay {
  day: string;
  name: string;
  duration: string;
  done: boolean;
  rest: boolean;
  today: boolean;
  exercises: Exercise[];
  dayId?: string;
  coverUrl?: string;
}

export interface WorkoutCompletion {
  id: string;
  workoutDayId: string;
  completedAt: string;
  durationMin: number;
  rating: number;
}

export interface CalendarDayInfo {
  date: Date;
  dayOfMonth: number;
  isCurrentMonth: boolean;
  isToday: boolean;
  isSelected: boolean;
  workoutDayId: string | null;
  isRestDay: boolean;
  isWorkoutDay: boolean;
  isCompleted: boolean;
  durationMin: number | null;
  exerciseCount: number;
  workoutName: string | null;
}
