import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from 'navigation/types';
import { useNavigation } from '@react-navigation/native';

const habits = [
  { title: 'Read 10 minutes', streaks: '1000+', selected: true },
  { title: 'Meditate 5 minutes', streaks: '80+', selected: false },
  { title: 'Walk for 15 minutes', streaks: '900+', selected: false },
  { title: 'Practice instrument', streaks: '90+', selected: false },
];

type ChooseHabitNavProp = NativeStackNavigationProp<RootStackParamList, 'Welcome'>;

export default function ChooseHabitScreen() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const navigation = useNavigation<ChooseHabitNavProp>();

  return (
    <ScrollView className="flex-1 bg-[#FAF9F7] px-6 py-12">
      {/* Heading */}
      <Text className="mb-2 text-3xl font-extrabold text-[#331B11]">Choose your first habit</Text>
      <Text className="mb-6 text-lg text-[#4B3C38]">Start with something that excites you</Text>

      {/* Create your own habit */}
      <TouchableOpacity className="mb-6 flex-row items-center justify-center rounded-2xl border border-dashed border-[#FF4F38] px-5 py-4">
        <Ionicons name="add" size={24} color="#331B11" />
        <Text className="ml-2 text-lg font-semibold text-[#331B11]">Create your own habit</Text>
      </TouchableOpacity>

      {/* Habit cards */}
      <View className="flex-row flex-wrap justify-between">
        {habits.map((habit, index) => (
          <TouchableOpacity
            key={index}
            className={`mb-4 w-[47%] rounded-3xl p-4 ${
              selectedIndex === index ? 'border-2 border-[#FF4F38] bg-white' : 'bg-[#F7F7F7]'
            }`}
            onPress={() => setSelectedIndex(index)}>
            <Ionicons name="book-outline" size={32} color="#FFB3A5" className="mb-2" />
            <Text className="text-base font-bold text-[#000000]">{habit.title}</Text>
            <Text className="mt-1 text-sm text-[#FF4F38]">{habit.streaks} streaks</Text>
            {selectedIndex === index && (
              <Ionicons
                name="checkmark-circle-outline"
                size={20}
                color="#FF4F38"
                style={{ position: 'absolute', top: 10, right: 10 }}
              />
            )}
          </TouchableOpacity>
        ))}
      </View>

      {/* Find Partners Button */}
      <TouchableOpacity
        className="mt-6 rounded-full bg-[#FF4F38] py-4"
        onPress={() => navigation.navigate('EnterHabitDetails')}>
        <Text className="text-center text-lg font-semibold text-white">Continue</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
