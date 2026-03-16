import type { WorkoutDay, ChatMessage, OnboardingStep, Package } from '@/types';

export const WEEK_PLAN: WorkoutDay[] = [
  {
    day: 'PON',
    name: 'Noge + gluteus',
    duration: '35 min',
    done: true,
    rest: false,
    today: false,
    exercises: [
      { id: '1', name: 'Čučnjevi', sets: '3×12', done: true },
      { id: '2', name: 'Iskoraci unazad', sets: '3×10', done: true },
      { id: '3', name: 'Hip thrust', sets: '3×12', done: true },
      { id: '4', name: 'Rumunsko mrtvo dizanje', sets: '3×10', done: true },
      { id: '5', name: 'Abdukcije', sets: '3×15', done: true },
    ],
  },
  {
    day: 'UTO',
    name: 'Odmor',
    duration: '',
    done: false,
    rest: true,
    today: false,
    exercises: [],
  },
  {
    day: 'SRE',
    name: 'Gornji deo tela',
    duration: '30 min',
    done: false,
    rest: false,
    today: true,
    exercises: [
      { id: '6', name: 'Sklekovi na kolenima', sets: '3×10', done: false },
      { id: '7', name: 'Veslanje sa gumom', sets: '3×12', done: false },
      { id: '8', name: 'Lateralna ramena', sets: '3×12', done: false },
      { id: '9', name: 'Biceps curl', sets: '3×10', done: false },
      { id: '10', name: 'Triceps dips', sets: '3×10', done: false },
      { id: '11', name: 'Plank', sets: '3×30s', done: false },
    ],
  },
  {
    day: 'ČET',
    name: 'Odmor',
    duration: '',
    done: false,
    rest: true,
    today: false,
    exercises: [],
  },
  {
    day: 'PET',
    name: 'Full body',
    duration: '40 min',
    done: false,
    rest: false,
    today: false,
    exercises: [
      { id: '12', name: 'Sumo čučanj', sets: '3×12', done: false },
      { id: '13', name: 'Push-up to plank', sets: '3×8', done: false },
      { id: '14', name: 'Kettlebell swing', sets: '3×15', done: false },
      { id: '15', name: 'Mountain climbers', sets: '3×20', done: false },
      { id: '16', name: 'Glute bridge', sets: '3×15', done: false },
      { id: '17', name: 'Plank sa rotacijom', sets: '3×10', done: false },
      { id: '18', name: 'Stretching', sets: '5 min', done: false },
    ],
  },
  {
    day: 'SUB',
    name: 'Odmor',
    duration: '',
    done: false,
    rest: true,
    today: false,
    exercises: [],
  },
  {
    day: 'NED',
    name: 'Odmor',
    duration: '',
    done: false,
    rest: true,
    today: false,
    exercises: [],
  },
];

export const PACKAGES: Package[] = [
  {
    id: 'starter',
    name: 'Starter',
    price: '4.900',
    duration: '4 nedelje',
    popular: false,
    features: [
      'Personalizovan plan',
      'Video za svaku vežbu',
      'Chat podrška',
    ],
  },
  {
    id: 'transform',
    name: 'Transform',
    price: '11.900',
    duration: '12 nedelja',
    popular: true,
    features: [
      'Personalizovan plan',
      'Video za svaku vežbu',
      'Chat podrška',
      'Praćenje napretka',
      'Nedeljne korekcije',
    ],
  },
  {
    id: 'premium',
    name: 'Premium',
    price: '19.900',
    duration: '6 meseci',
    popular: false,
    features: [
      'Sve iz Transform',
      'Mesečni video poziv',
      'Prioritetna podrška',
      'Nutrition vodič',
    ],
  },
];

export interface Transformation {
  name: string;
  age: number;
  months: number;
  desc: string;
}

export const TRANSFORMATIONS: Transformation[] = [
  { name: 'Jelena M.', age: 42, months: 4, desc: 'Izgubila 8kg i potpuno promenila odnos prema treningu' },
  { name: 'Dragana S.', age: 38, months: 3, desc: 'Tonirala telo i dobila energiju koju nije imala godinama' },
  { name: 'Milica R.', age: 51, months: 6, desc: 'Rešila bolove u leđima i ojačala celo telo' },
  { name: 'Ana T.', age: 45, months: 5, desc: 'Skinula 12kg i prvi put se oseća sigurno u teretani' },
];

export const ONBOARDING_STEPS: OnboardingStep[] = [
  {
    emoji: '👋',
    title: 'Dobrodošla!',
    subtitle: 'Ja sam Maja Petrović, tvoj personalni trener. Hajde da napravimo plan baš za tebe.',
    options: null,
  },
  {
    emoji: '🎯',
    title: 'Koji je tvoj cilj?',
    subtitle: 'Izaberi ono što ti je najvažnije',
    options: ['Mršavljenje', 'Toniranje tela', 'Više energije', 'Zdravlje i pokretljivost'],
  },
  {
    emoji: '💪',
    title: 'Tvoja fizička forma',
    subtitle: 'Budi iskrena — nema pogrešnog odgovora',
    options: ['Početnica sam', 'Treniram povremeno', 'Redovno vežbam'],
  },
  {
    emoji: '📅',
    title: 'Koliko puta nedeljno?',
    subtitle: 'Preporučujem 3× za optimalne rezultate',
    options: ['2× nedeljno', '3× nedeljno', '4× nedeljno', '5× nedeljno'],
  },
  {
    emoji: '✨',
    title: 'Tvoj plan je spreman!',
    subtitle: 'Personalizovan program treninga kreiran na osnovu tvojih odgovora. Hajde da počnemo!',
    options: null,
  },
];

export const CHAT_MESSAGES: ChatMessage[] = [
  { id: '1', from: 'trainer', text: 'Zdravo! Kako si se osećala posle ponedeljkovog treninga? 😊', time: '09:15' },
  { id: '2', from: 'user', text: 'Malo me bole noge ali super sam! 💪', time: '10:22' },
  { id: '3', from: 'trainer', text: 'To je potpuno normalno posle treninga nogu! Znači da su mišići radili. Sutra će biti lakše. Samo nastavi ovako! 🙌', time: '10:30' },
  { id: '4', from: 'trainer', text: 'Danas imaš gornji deo tela. Fokusiraj se na formu, ne na brzinu. Pošalji mi poruku kad završiš!', time: '14:00' },
];
