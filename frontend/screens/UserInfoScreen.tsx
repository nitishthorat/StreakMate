import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from 'navigation/types';
import { Ionicons } from '@expo/vector-icons';

type UserInfoNavProp = NativeStackNavigationProp<RootStackParamList, 'UserInfo'>;
export default function UserInfoScreen() {
  const navigation = useNavigation<UserInfoNavProp>();

  return (
    <View className="flex-1 bg-[#FAF8F7] p-6">
      {/* Back Button */}
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={{ position: 'absolute', left: 16, top: 40, zIndex: 10 }}
      >
        <Ionicons name="arrow-back" size={28} color="#3E2723" />
      </TouchableOpacity>
      <Text className="mb-2 text-center text-2xl font-bold text-[#3E2723]">
        Tell us about yourself
      </Text>
      <Text className="mb-6 text-center text-[#3E2723]">Help us personalize your experience</Text>

      {/* Upload photo placeholder */}
      <View className="mb-4 items-center">
        <View className="mb-2 h-20 w-20 items-center justify-center rounded-full bg-[#FFD2CC]">
          <Text className="text-3xl">⬆️</Text>
        </View>
        <TouchableOpacity className="rounded-full border border-gray-300 px-4 py-1">
          <Text className="text-gray-500">Upload a photo</Text>
        </TouchableOpacity>
      </View>

      <Text className="mb-1 font-semibold text-gray-700">What’s your name?</Text>
      <TextInput className="mb-4 rounded-md border bg-white px-4 py-2" placeholder="Enter name" />

      <Text className="mb-1 font-semibold text-gray-700">Short bio (optional)</Text>
      <TextInput
        className="mb-1 h-24 rounded-md border bg-white px-4 py-2"
        placeholder="Tell us what motivates you..."
        multiline
        maxLength={140}
      />
      <Text className="mb-4 text-xs text-gray-400">0/140</Text>

      <Text className="mb-2 font-semibold text-gray-700">I want to:</Text>
      <View className="mb-6 flex-row justify-between overflow-hidden rounded-full border border-[#FF4F38]">
        <TouchableOpacity className="border-r border-[#FF4F38] px-4 py-2">
          <Text className="font-semibold text-[#FF4F38]">Build habits alone</Text>
        </TouchableOpacity>
        <TouchableOpacity className="px-4 py-2">
          <Text className="font-semibold text-[#FF4F38]">Find a partner</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        className="mt-10 rounded-full bg-[#FF4F38] px-6 py-4"
        onPress={() => navigation.navigate('ChooseHabit')}>
        <Text className="text-center text-lg font-semibold text-white">Continue ➔</Text>
      </TouchableOpacity>
    </View>
  );
}
