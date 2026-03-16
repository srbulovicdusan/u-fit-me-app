export type FitnessLevel = 'pocetnica' | 'povremeno' | 'redovno';

export interface Profile {
  id: string;
  fullName: string;
  avatarUrl?: string;
  fitnessLevel: FitnessLevel;
  workoutFrequency: number;
  goals: string[];
  isOnboarded: boolean;
  createdAt: string;
}

export interface OnboardingSelections {
  [step: number]: string;
}

export interface OnboardingStep {
  emoji: string;
  title: string;
  subtitle: string;
  options: string[] | null;
}
