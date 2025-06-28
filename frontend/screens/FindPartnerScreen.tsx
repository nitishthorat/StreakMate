import React from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from 'navigation/types';

type FindPartnerNavProp = NativeStackNavigationProp<RootStackParamList, 'FindPartner'>;

const partners = [
  {
    id: '1',
    name: 'Marvis',
    bio: 'Love reading and morning walks 📚🚶‍♀️',
    timezone: 'PST',
    habit: 'Read 10 mins',
    avatar: require('../assets/avatar-1.png'),
  },
  {
    id: '2',
    name: 'Luna',
    bio: 'Artist seeking creative consistency 🎨✨',
    timezone: 'PST',
    habit: 'Create art',
    avatar: require('../assets/avatar-2.png'),
  },
  {
    id: '3',
    name: 'Max',
    bio: 'Fitness enthusiast & meditation newbie 💪🧘‍♂️',
    timezone: 'EST',
    habit: 'Exercise 20 mins',
    avatar: require('../assets/avatar-3.png'),
  },
];

export default function FindPartnerScreen() {
  const navigation = useNavigation<FindPartnerNavProp>();

  return (
    <View className="flex-1 bg-[#F7F7F7] px-5 pt-12">
      {/* Header */}
      <View className="mb-6 flex-row items-center justify-between">
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text className="text-base font-semibold text-black">{'← Back'}</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text className="text-2xl">🔔</Text>
        </TouchableOpacity>
      </View>

      {/* Title */}
      <Text className="text-center text-3xl font-extrabold text-black">
        Connect with your{'\n'}habit buddy
      </Text>
      <Text className="mt-2 text-center text-base text-[#4B3E3E]">
        Find someone who shares your goals
      </Text>

      {/* Invite Button */}
      <TouchableOpacity className="mx-auto mt-6 rounded-full border border-[#FF4F38] px-6 py-3">
        <Text className="text-base font-semibold text-[#FF4F38]">
          Send your partner an invite to join 🔗
        </Text>
      </TouchableOpacity>

      {/* Partner List */}
      <ScrollView className="mt-6">
        {partners.map((partner) => (
          <View key={partner.id} className="mb-4 rounded-2xl bg-white p-4 shadow-sm">
            <View className="flex-row items-center">
              <Image
                source={partner.avatar}
                className="mr-4 h-16 w-16 rounded-2xl"
                resizeMode="cover"
              />
              <View className="flex-1">
                <Text className="text-lg font-bold text-black">{partner.name}</Text>
                <Text className="text-sm text-gray-700">{partner.bio}</Text>
                <Text className="mt-1 text-xs text-gray-500">📍 {partner.timezone}</Text>
                <View className="mt-2 self-start rounded-full bg-[#F7F3F2] px-3 py-1">
                  <Text className="text-sm text-[#4B3E3E]">Shared habit: {partner.habit}</Text>
                </View>
              </View>
            </View>
            <TouchableOpacity className="mt-4 w-full rounded-full border border-[#FF4F38] py-3">
              <Text className="text-center text-base font-semibold text-[#FF4F38]">
                Send request
              </Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}
