import { useFonts } from 'expo-font';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ChooseHabitScreen from 'screens/ChooseHabitScreen';
import { RootStackParamList } from 'navigation/types';

import './global.css';
import WelcomeScreen from 'screens/WelcomeScreen';
import UserInfoScreen from 'screens/UserInfoScreen';
import EnterHabitDetailsScreen from 'screens/EnterHabitDetailsScreen';

import DashboardScreen from 'screens/DashboardScreen';
import BottomTabs from 'components/BottomTabs';
import LeaderboardScreen from 'screens/LeaderboardScreen';
import FindPartnerScreen from 'screens/FindPartnerScreen';
const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  const [fontsLoaded] = useFonts({
    'manrope-extrabold': require('./assets/fonts/Manrope-VariableFont_wght.ttf'),
  });

  if (!fontsLoaded) return null;

  return (
    <>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Welcome" screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Welcome" component={WelcomeScreen} />
          <Stack.Screen name="UserInfo" component={UserInfoScreen} />
          <Stack.Screen name="ChooseHabit" component={ChooseHabitScreen} />
          <Stack.Screen name="EnterHabitDetails" component={EnterHabitDetailsScreen} />
          <Stack.Screen name="Dashboard" component={DashboardScreen} />
          <Stack.Screen name="FindPartner" component={FindPartnerScreen} />
          <Stack.Screen name="Leaderboard" component={LeaderboardScreen} />
        </Stack.Navigator>
        <BottomTabs />
      </NavigationContainer>
    </>
  );
}
