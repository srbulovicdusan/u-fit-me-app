export interface Exercise {
  id: string;
  name: string;
  sets: string;
  done: boolean;
  videoUrl?: string;
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
}

export interface WorkoutCompletion {
  id: string;
  workoutPlanId: string;
  completedAt: string;
  durationMin: number;
  rating: number;
  exercisesCompleted: string[];
}
