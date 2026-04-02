import { Tabs } from 'expo-router';
import { House, User, Tag, CircleUserRound } from 'lucide-react-native';
import { Colors } from '@/constants/colors';
import { TAB_LABELS } from '@/constants/strings';

export default function FreeTabsLayout() {
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
          fontSize: 10,
          fontWeight: '500',
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: TAB_LABELS.free.home,
          tabBarIcon: ({ color, size }) => <House style={{marginBottom: 4}} size={size + 2} color={color} />,
        }}
      />
      <Tabs.Screen
        name="trainer"
        options={{
          title: TAB_LABELS.free.trainer,
          tabBarIcon: ({ color, size }) => <User style={{marginBottom: 4}} size={size + 2} color={color} />,
        }}
      />
      <Tabs.Screen
        name="packages"
        options={{
          title: TAB_LABELS.free.packages,
          tabBarIcon: ({ color, size }) => <Tag style={{marginBottom: 4}} size={size + 2} color={color} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profil',
          tabBarIcon: ({ color, size }) => <CircleUserRound style={{marginBottom: 4}} size={size + 2} color={color} />,
        }}
      />
    </Tabs>
  );
}
