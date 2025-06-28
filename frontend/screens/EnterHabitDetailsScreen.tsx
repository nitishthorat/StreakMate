import React, { useState } from 'react';
import { Text, TextInput, TouchableOpacity, View, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from 'navigation/types';

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'EnterHabitDetails'>;

export default function EnterHabitDetailsScreen() {
  const navigation = useNavigation<NavigationProp>();

  const [habitName, setHabitName] = useState('');
  const [description, setDescription] = useState('');
  const [visibility, setVisibility] = useState<'public' | 'private'>('public');
  const [goal, setGoal] = useState(21);

  const goals = [7, 21, 14, 30];

  return (
    <ScrollView className="flex-1 bg-[#F8F7F5] px-6 py-8">
      <View className="mb-4 items-end">
        <Text className="text-2xl">🔔</Text>
      </View>

      <Text className="mb-6 text-center text-3xl font-semibold text-[#2F1D14]">
        Create your own habit
      </Text>

      <Text className="mb-2 text-lg font-semibold text-gray-700">Name the habit</Text>
      <TextInput
        className="mb-4 rounded-lg border border-gray-200 bg-white p-4"
        placeholder="Your name"
        value={habitName}
        onChangeText={setHabitName}
      />

      <Text className="mb-2 text-lg font-semibold text-gray-700">Description</Text>
      <TextInput
        className="mb-1 rounded-lg border border-gray-200 bg-white p-4"
        placeholder="Describe your habit..."
        value={description}
        onChangeText={setDescription}
        multiline
        maxLength={140}
      />
      <Text className="mb-4 text-right text-gray-400">{description.length}/140</Text>

      <Text className="mb-2 text-lg font-semibold text-gray-700">I want to keep this habit:</Text>
      <Text className="mb-2 text-lg font-semibold text-gray-700">Visibility:</Text>
      <View className="mb-6 flex-row justify-between overflow-hidden rounded-full border border-[#FF4F38]">
        <TouchableOpacity
          className={`flex-1 px-4 py-3 ${visibility === 'public' ? 'bg-[#FF4F38]' : 'bg-white'}`}
          onPress={() => setVisibility('public')}>
          <Text
            className={`text-center font-semibold ${
              visibility === 'public' ? 'text-white' : 'text-[#FF4F38]'
            }`}>
            Public
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          className={`flex-1 px-4 py-3 ${visibility === 'private' ? 'bg-[#FF4F38]' : 'bg-white'}`}
          onPress={() => setVisibility('private')}>
          <Text
            className={`text-center font-semibold ${
              visibility === 'private' ? 'text-white' : 'text-[#FF4F38]'
            }`}>
            Private
          </Text>
        </TouchableOpacity>
      </View>

      <Text className="mb-2 text-lg font-semibold text-gray-700">Goal duration</Text>
      <View className="mb-8 flex-row flex-wrap gap-3">
        {goals.map((g) => (
          <TouchableOpacity
            key={g}
            className={`rounded-lg border px-4 py-2 ${
              goal === g ? 'border-[#FF4F38] bg-[#FF4F38]' : 'border-[#FF4F38]'
            }`}
            onPress={() => setGoal(g)}>
            <Text className={`font-medium ${goal === g ? 'text-white' : 'text-[#FF4F38]'}`}>
              {g} Days
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity
        className="mb-4 rounded-full bg-[#FF4F38] py-4"
        onPress={() => navigation.navigate('Dashboard')}
      >
        <Text className="text-center text-lg font-semibold text-white">Continue →</Text>
      </TouchableOpacity>

      {visibility === 'private' && (
        <Text className="mt-2 text-center text-black">Send your partner an invite to join 🔗</Text>
      )}
    </ScrollView>
  );
}
