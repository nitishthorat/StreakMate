import React, { useState } from 'react';
import { View, Text, ScrollView, Image } from 'react-native';
import { TouchableOpacity } from 'react-native';

const users = [
  'Richard Wong',
  'Maria Garcia',
  'James Smith',
  'Aisha Khan',
  "Liam O'Connor",
  'Fatima El-Amin',
  'Noah Patel',
  'Sophia Lee',
  'Ethan Robinson',
  'Chloe Brown',
  'Oliver Johnson',
];

export default function LeaderboardScreen() {
  const [tab, setTab] = useState<'global' | 'private'>('global');

  return (
    <ScrollView className="flex-1 bg-[#F7F7F7] px-5 pt-5">
      {/* Upcoming Badges */}
      <View className="mb-6 rounded-2xl bg-white px-4 py-5 shadow-sm">
        <Text className="mb-4 text-lg font-semibold text-[#FF4F38]">Upcoming Badges</Text>
        <View className="flex-row justify-between">
          {/* {['7 Day', '21 Day', '30 Day', '6 Month'].map((label, i) => (
            <View key={i} className="items-center">
              <Image
                source={require('../assets/badge.png')} // Replace with actual icons
                className="h-12 w-12"
                resizeMode="contain"
              />
              <Text className="mt-2 text-xs text-gray-600">{label} Streak</Text>
            </View>
          ))} */}
        </View>
      </View>

      {/* Leaderboard Header */}
      <Text className="mb-4 text-center text-2xl font-bold text-black">Leaderboard</Text>

      {/* Tab Toggle */}
      <View className="mb-4 flex-row self-center overflow-hidden rounded-full border border-[#FF4F38]">
        <TouchableOpacity
          onPress={() => setTab('global')}
          className={`px-6 py-2 ${tab === 'global' ? 'bg-[#FF4F38]' : ''}`}>
          <Text className={`font-semibold ${tab === 'global' ? 'text-white' : 'text-[#FF4F38]'}`}>
            Global
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setTab('private')}
          className={`px-6 py-2 ${tab === 'private' ? 'bg-[#FF4F38]' : ''}`}>
          <Text className={`font-semibold ${tab === 'private' ? 'text-white' : 'text-[#FF4F38]'}`}>
            Private
          </Text>
        </TouchableOpacity>
      </View>

      {/* Leaderboard List */}
      <View className="rounded-2xl bg-white px-4 py-5 shadow-sm">
        {users.map((name, index) => (
          <View key={index} className="mb-3 flex-row items-center justify-between">
            <Text className="w-5 font-bold text-black">{index + 1}</Text>
            <Text className="flex-1 pl-4 font-medium text-neutral-800">{name}</Text>
            <View className="flex-row">
              {/* {[...Array(3)].map((_, i) => (
                <Image
                  key={i}
                  source={require('../assets/badge.png')} // Replace with actual badge icons
                  className="ml-1 h-5 w-5"
                />
              ))} */}
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}
