export interface Measurement {
  label: string;
  value: string;
  change: string;
  good: boolean;
}

export interface ProgressEntry {
  id: string;
  userId: string;
  weight?: number;
  waistCm?: number;
  hipsCm?: number;
  photoUrl?: string;
  recordedAt: string;
}

export interface WeightDataPoint {
  week: string;
  value: number;
}
