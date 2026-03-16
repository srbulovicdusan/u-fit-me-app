import { router } from 'expo-router';
import ScreenContainer from '@/components/ui/ScreenContainer';
import PrimaryButton from '@/components/ui/PrimaryButton';
import HomeHeader from '@/components/home/HomeHeader';
import FreeWorkoutCard from '@/components/home/FreeWorkoutCard';
import DailyTip from '@/components/home/DailyTip';
import ProgramPreview from '@/components/home/ProgramPreview';
import { APP_NAME } from '@/constants/strings';
import { Spacing } from '@/constants/typography';

export default function HomeFreeScreen() {
  return (
    <ScreenContainer>
      <HomeHeader greeting={`Dobrodošla u ${APP_NAME}`} />
      <FreeWorkoutCard onStart={() => {}} />
      <DailyTip />
      <ProgramPreview />
      <PrimaryButton
        title="Otključaj puni program"
        onPress={() => router.push('/(free)/packages')}
        style={{ marginHorizontal: Spacing.screenPadding, marginVertical: Spacing.lg }}
      />
    </ScreenContainer>
  );
}
