import { useFonts } from 'expo-font';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from 'navigation/types';

import './global.css';
import WelcomeScreen from 'screens/WelcomeScreen';
import UserInfoScreen from 'screens/UserInfoScreen';

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
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}
