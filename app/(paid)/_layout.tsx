import { Tabs, Redirect } from 'expo-router';
import { House, Dumbbell, TrendingUp, MessageCircle, CircleUserRound } from 'lucide-react-native';
import { Colors } from '@/constants/colors';
import { TAB_LABELS } from '@/constants/strings';
import { useAuth } from '@/hooks/use-auth';

export default function PaidTabsLayout() {
  const { session } = useAuth();

  if (!session) {
    return <Redirect href="/(free)" />;
  }

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: Colors.accent,
        tabBarInactiveTintColor: Colors.muted,
        tabBarStyle: {
          backgroundColor: Colors.card,
          borderTopColor: Colors.border,
          borderTopWidth: 1,
          paddingTop: 8,
          paddingBottom: 24,
          height: 84,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '500',
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: TAB_LABELS.paid.home,
          tabBarIcon: ({ color, size }) => <House style={{marginBottom: 4}} size={size + 2} color={color} />,
        }}
      />
      <Tabs.Screen
        name="workouts"
        options={{
          title: TAB_LABELS.paid.workouts,
          tabBarIcon: ({ color, size }) => <Dumbbell style={{marginBottom: 4}} size={size + 2} color={color} />,
        }}
      />
      <Tabs.Screen
        name="progress"
        options={{
          title: TAB_LABELS.paid.progress,
          tabBarIcon: ({ color, size }) => <TrendingUp style={{marginBottom: 4}} size={size + 2} color={color} />,
        }}
      />
      <Tabs.Screen
        name="chat"
        options={{
          title: TAB_LABELS.paid.chat,
          tabBarIcon: ({ color, size }) => <MessageCircle style={{marginBottom: 4}} size={size + 2} color={color} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: TAB_LABELS.paid.profile,
          tabBarIcon: ({ color, size }) => <CircleUserRound style={{marginBottom: 4}} size={size + 2} color={color} />,
        }}
      />
    </Tabs>
  );
}
