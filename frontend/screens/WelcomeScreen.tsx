import { View, Text, Image, TouchableOpacity } from 'react-native';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from 'react-native-screens/lib/typescript/native-stack/types';
import { RootStackParamList } from 'navigation/types';

type WelcomeNavProp = NativeStackNavigationProp<RootStackParamList, 'Welcome'>;

export default function WelcomeScreen() {
  const navigation = useNavigation<WelcomeNavProp>();

  return (
    <View className="flex-1 bg-[#FF4E42] px-10 pt-28">
      {/* App Icon */}
      <Image
        source={require('../assets/calendar.png')}
        className="mb-6 h-[73px] w-[73px]"
        resizeMode="contain"
      />

      {/* Heading */}
      <Text className="font-manrope text-[55px] font-black leading-tight text-white">
        Welcome to <Text className="font-extrabold text-white">Streak</Text>
        <Text className="font-bold text-white">Mate</Text>
      </Text>

      {/* Subheading */}
      <Text className="mb-12 mt-4 text-lg text-white">
        Let&apos;s build something great together
      </Text>

      {/* Avatars */}
      <View className="mb-12 flex-row justify-center">
        <Image
          source={require('../assets/avatar-1.png')}
          className="mr-4 h-28 w-28"
          resizeMode="contain"
        />
        <Image
          source={require('../assets/avatar-2.png')}
          className="h-28 w-28"
          resizeMode="contain"
        />
      </View>

      {/* CTA Button */}
      <TouchableOpacity
        onPress={() => navigation.navigate('UserInfo')}
        className="mt-10 w-full max-w-xs rounded-full bg-white px-8 py-4 shadow-md">
        <Text className="text-center text-base font-bold text-[#FF4F38]">Lets Get started</Text>
      </TouchableOpacity>
    </View>
  );
}
