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
    id: 'plan-treninga',
    name: 'Plan treninga',
    price: '5.900',
    duration: 'Jednokratna kupovina',
    popular: false,
    features: [
      'Personalizovan plan treninga',
      'Video za svaku vežbu',
      'Chat podrška sa trenerom',
      'Praćenje napretka',
      'Nedeljne korekcije',
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
    emoji: '',
    title: 'Dobrodošla!\nJa sam Marko, tvoj trener',
    subtitle: 'Zajedno ćemo napraviti plan treninga za tvoje ciljeve i tvoj život, bez stresa i pretjerivanja.',
    options: null,
  },
  {
    emoji: '',
    title: 'Koji je tvoj cilj?',
    subtitle: 'Izaberi šta želiš da postigneš.',
    options: [
      { label: 'Mršavljenje', icon: 'Flame' },
      { label: 'Snaga', icon: 'Dumbbell' },
      { label: 'Mobilnost', icon: 'StretchHorizontal' },
      { label: 'Više energije', icon: 'Zap' },
      { label: 'Opšta forma', icon: 'Heart' },
    ],
  },
  {
    emoji: '',
    title: 'Koji je tvoj nivo forme?',
    subtitle: 'Izaberi ono što te najbolje opisuje.',
    options: [
      { label: 'Početnik', description: 'Tek počinjem ili se vraćam nakon pauze', icon: 'Sprout' },
      { label: 'Srednji', description: 'Već treniram i imam osnovnu kondiciju', icon: 'TrendingUp' },
      { label: 'Napredni', description: 'Redovno treniram i želim veći izazov', icon: 'Trophy' },
    ],
  },
  {
    emoji: '',
    title: 'Koji ti tempo odgovara?',
    subtitle: 'Izaberi koliko puta nedeljno možeš da treniraš.',
    options: [
      { label: '2 puta nedeljno', icon: 'Calendar' },
      { label: '3 puta nedeljno', icon: 'Calendar' },
      { label: '4 puta nedeljno', icon: 'CalendarCheck' },
      { label: '5 puta nedeljno', icon: 'CalendarCheck' },
    ],
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
