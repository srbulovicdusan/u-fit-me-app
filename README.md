# FitSa — React Native Setup Guide

## Šta imaš do sada

- `fitness-app.jsx` — Kompletan React (web) prototip sa svim ekranima
- `FitSa-Design-Spec.docx` — Design specifikacija (boje, tipografija, spacing)
- `hero.jpg` — Hero slika za Today's Workout karticu

## Korak 1: Instaliraj alate

```bash
# Node.js (ako nemaš)
# Preuzmi sa https://nodejs.org (LTS verzija)

# Expo CLI (najlakši način za React Native)
npm install -g expo-cli

# VS Code ekstenzije (instaliraj iz VS Code-a):
# - "React Native Tools" (Microsoft)
# - "ES7+ React/Redux/React-Native snippets"
# - "Expo Tools"
```

## Korak 2: Kreiraj projekat

```bash
# Kreiraj novi Expo projekat
npx create-expo-app FitSa --template blank

cd FitSa

# Instaliraj dependencies
npx expo install react-native-screens react-native-safe-area-context
npx expo install @react-navigation/native @react-navigation/bottom-tabs @react-navigation/native-stack
npx expo install expo-av           # za video player
npx expo install expo-image-picker # za foto dnevnik
npx expo install expo-notifications # za push notifikacije
```

## Korak 3: Struktura foldera

Napravi ovu strukturu unutar `FitSa/` foldera:

```
FitSa/
├── App.js                    # Entry point, navigacija
├── app.json
├── package.json
├── assets/
│   ├── hero.jpg              # ← Kopiraj hero sliku ovde
│   ├── icon.png
│   └── splash.png
├── src/
│   ├── constants/
│   │   └── colors.js         # Paleta boja
│   │   └── typography.js     # Font stilovi
│   ├── components/
│   │   ├── TabBar.js         # Custom tab bar
│   │   ├── WorkoutCard.js    # Kartica treninga
│   │   ├── ExerciseItem.js   # Vežba sa checkbox-om
│   │   ├── TrainerNote.js    # Poruka trenera
│   │   ├── StreakBadge.js    # Streak kartica
│   │   ├── PackageCard.js    # Paket za kupovinu
│   │   └── ChatBubble.js     # Chat poruka
│   ├── screens/
│   │   ├── SplashScreen.js
│   │   ├── OnboardingScreen.js
│   │   ├── free/
│   │   │   ├── HomeFreeScreen.js
│   │   │   ├── TrainerScreen.js
│   │   │   └── PackagesScreen.js
│   │   └── paid/
│   │       ├── HomePaidScreen.js
│   │       ├── WorkoutsScreen.js
│   │       ├── ActiveWorkoutScreen.js
│   │       ├── ExerciseVideoScreen.js
│   │       ├── CompletionScreen.js
│   │       ├── ProgressScreen.js
│   │       ├── ChatScreen.js
│   │       └── ProfileScreen.js
│   ├── navigation/
│   │   ├── FreeTabNavigator.js
│   │   └── PaidTabNavigator.js
│   └── data/
│       ├── workouts.js       # Mock podaci za treninge
│       └── transformations.js
```

## Korak 4: Kopiraj fajlove u projekat

Kopiraj ove fajlove u `FitSa/src/`:

- `colors.js` → `src/constants/colors.js`
- `App.js` → `App.js` (zameni postojeći)

## Korak 5: Pokreni

```bash
# Pokreni razvojni server
npx expo start

# Opcije:
# - Skeniraj QR kod sa Expo Go app-om na telefonu
# - Pritisni 'i' za iOS simulator
# - Pritisni 'a' za Android emulator
```

## Korak 6: Nastavi razvoj

Sada imaš React (web) prototip kao referencu. Za svaki ekran:

1. Otvori odgovarajući screen fajl (npr. `HomePaidScreen.js`)
2. Otvori `fitness-app.jsx` pored njega u VS Code-u
3. Prepiši logiku i stil, zamenjujući:

| React (Web)        | React Native             |
|--------------------|--------------------------|
| `<div>`            | `<View>`                 |
| `<span>`, `<p>`    | `<Text>`                 |
| `<button>`         | `<TouchableOpacity>`     |
| `<input>`          | `<TextInput>`            |
| `<img>`            | `<Image>`                |
| `style={{ ... }}`  | `StyleSheet.create({})` |
| `overflow: auto`   | `<ScrollView>`           |
| `onClick`          | `onPress`                |
| `border-radius`    | `borderRadius`           |
| `font-size: 14px`  | `fontSize: 14`           |
| `background`       | `backgroundColor`        |
| `#fff`             | `'#FFFFFF'`              |

## Tipovi navigacije

```
SplashScreen → OnboardingScreen → AuthScreen
  ↓
isPaid === false → FreeTabNavigator (3 taba)
isPaid === true  → PaidTabNavigator (5 tabova)
```

## VS Code saveti

- Koristi Split Editor (Ctrl+\) da imaš web prototip i RN fajl jedan pored drugog
- Instaliraj "React Native Tools" za debugging
- Koristi Expo Go na telefonu za live preview dok kodiraš
- Claude Code (CLI) može da ti pomaže sa konverzijom screen by screen

---

*Svi fajlovi ispod su starter kod — kopiraj ih u odgovarajuće lokacije.*
