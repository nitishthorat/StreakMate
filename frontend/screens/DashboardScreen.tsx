import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, ActivityIndicator, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from 'navigation/types';

// Define habit type for type safety
type Habit = {
  id: string;
  name: string;
  description: string;
  category: string;
  streak: number;
  groupStreak: number;
  frequency: string;
  timeOfDay: string;
  lastCompleted: string | null;
  goalDays: number;
  daysCompleted: number;
};

// Define user data type
type UserData = {
  name: string;
  streak: number;
  hasPartner: boolean;
  partnerAccepted: boolean;
};

// Mock data for habits (replace with API call when backend is ready)
const mockHabits: Habit[] = [
  {
    id: '1',
    name: 'Read 10 minutes',
    description: 'Description of what is intended by the heading',
    category: 'Education',
    streak: 0,
    groupStreak: 0,
    frequency: 'Daily',
    timeOfDay: 'Evening',
    lastCompleted: null,
    goalDays: 7,
    daysCompleted: 0,
  },
];

// Mock user data
const userData: UserData = {
  name: 'Ayushi',
  streak: 0,
  hasPartner: true,
  partnerAccepted: false,
};

type DashboardNavProp = NativeStackNavigationProp<RootStackParamList, 'Dashboard'>;

export default function DashboardScreen() {
  const navigation = useNavigation<DashboardNavProp>();
  const [habits, setHabits] = useState<Habit[]>(mockHabits);
  const [user, setUser] = useState<UserData>(userData);
  const [loading, setLoading] = useState(false);
  const [selectedDayGoal, setSelectedDayGoal] = useState(7); // Default to 7 days goal

  // Function to fetch habits and user data from backend (when implemented)
  const fetchData = async () => {
    try {
      setLoading(true);
      // Replace with actual API calls when backend is ready
      // const habitsResponse = await fetch('http://your-api-url/habits');
      // const habitsData = await habitsResponse.json();
      // const userResponse = await fetch('http://your-api-url/user');
      // const userData = await userResponse.json();

      // Using mock data for now
      setTimeout(() => {
        setHabits(mockHabits);
        setUser(userData);
        setLoading(false);
      }, 500);
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const checkIn = (habitId: string) => {
    // Update UI optimistically
    setHabits(
      habits.map((habit) =>
        habit.id === habitId
          ? {
              ...habit,
              lastCompleted: new Date().toISOString(),
              streak: habit.streak + 1,
              daysCompleted: habit.daysCompleted + 1,
            }
          : habit
      )
    );

    // Would send to backend in a real implementation
    // fetch('http://your-api-url/habits/checkin', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ habitId })
    // });
  };

  const isCompletedToday = (lastCompleted: string | null) => {
    if (!lastCompleted) return false;

    const today = new Date().toDateString();
    const lastCompletedDate = new Date(lastCompleted).toDateString();
    return today === lastCompletedDate;
  };

  const selectGoal = (days: number) => {
    setSelectedDayGoal(days);
    // In a real implementation, you would update the habit's goal days
    // and send to the backend
  };

  return (
    <View className="flex-1 bg-[#F4F4F2]">
      {/* Header with bell notification */}
      <View className="flex-row items-center justify-between bg-[#F4F4F2] p-6 pb-6 pt-14">
        <View>
          <Text className="text-3xl font-bold text-[#3C2A21]">Welcome {user.name}</Text>
          <Text className="mt-1 text-lg text-[#3C2A21]">Ready to build your first streak!</Text>
        </View>
        <TouchableOpacity>
          <Text className="text-2xl">🔔</Text>
        </TouchableOpacity>
      </View>

      {/* Main Content */}
      <ScrollView className="flex-1 p-5">
        {loading ? (
          <View className="items-center justify-center py-10">
            <ActivityIndicator size="large" color="#FF4F38" />
          </View>
        ) : (
          <>
            {/* Habit Card */}
            {habits.map((habit) => (
              <View key={habit.id} className="mb-4 rounded-3xl bg-white p-6 shadow-sm">
                <View className="flex-row justify-between">
                  <Text className="font-semibold text-[#FF4F38]">Habit</Text>
                  <TouchableOpacity className="rounded-full border border-[#FF4F38] bg-white px-4 py-1" onPress={() => navigation.navigate('FindPartner')}>
                    <Text className="text-[#FF4F38]">Find a partner</Text>
                  </TouchableOpacity>
                </View>

                <Text className="mt-2 text-3xl font-bold text-black">{habit.name}</Text>
                <Text className="mb-4 mt-1 text-gray-500">
                  Daily reading: simple, sustainable, boosts focus, increases knowledge.
                </Text>

                <View className="mb-4 rounded-xl bg-[#FFF1EC] p-5">
                  <View className="mb-4 flex-row justify-between">
                    <Text className="text-gray-600">Start</Text>
                    <Text className="font-medium text-gray-500">LEVEL 1</Text>
                  </View>

                  {/* Progress bar container */}
                  <View className="relative mb-4 h-3">
                    {/* Base line */}
                    <View className="absolute left-0 right-0 top-1/2 h-[3px] -translate-y-1/2 rounded-full bg-white" />

                    {/* Active portion of the bar */}
                    <View
                      className="absolute left-0 top-1/2 h-[3px] -translate-y-1/2 rounded-full bg-[#FF4F38]"
                      style={{ width: '5%' }}
                    />

                    {/* Orange indicator dot */}
                    <View className="absolute left-[5%] top-1/2 -ml-[6px] h-[14px] w-[14px] -translate-y-1/2 rounded-full bg-[#FF4F38]" />
                  </View>

                  {/* Day labels */}
                  <View className="flex-row justify-between">
                    <TouchableOpacity onPress={() => selectGoal(7)} className="items-center">
                      <Text className="text-sm text-gray-700">7 Days</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => selectGoal(14)} className="items-center">
                      <Text className="text-sm text-gray-700">14 Days</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => selectGoal(21)} className="items-center">
                      <Text className="text-sm text-gray-700">21 Days</Text>
                    </TouchableOpacity>
                  </View>
                </View>

                <View className="flex-row items-center justify-between">
                  <View className="flex-row items-center">
                    <View className="flex-row">
                      {/* First avatar with border for layering effect */}
                      <View
                        className="h-10 w-10 items-center justify-center overflow-hidden rounded-full border border-white bg-gray-200"
                        style={{ zIndex: 0 }}>
                        <Image
                          source={require('../assets/avatar-1.png')}
                          style={{ width: 28, height: 28, borderRadius: 14 }}
                          defaultSource={require('../assets/avatar-1.png')}
                        />
                      </View>

                      {/* Second avatar positioned with negative margin to create overlap */}
                      <View
                        className="-ml-6 mr-2 h-10 w-10 items-center justify-center overflow-hidden rounded-full border border-white bg-gray-200"
                        style={{ zIndex: 1 }}>
                        <Image
                          source={require('../assets/avatar-3.png')}
                          style={{ width: 28, height: 28, borderRadius: 14 }}
                          defaultSource={require('../assets/avatar-3.png')}
                        />
                      </View>
                    </View>
                    <Text className="text-gray-600">Group streak {habit.groupStreak}</Text>
                  </View>

                  <TouchableOpacity
                    className="rounded-full bg-[#FF4F38] px-8 py-3"
                    onPress={() => !isCompletedToday(habit.lastCompleted) && checkIn(habit.id)}>
                    <Text className="font-semibold text-white">Check in</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}

            {/* Milestone Card */}
            <View className="mb-4 rounded-3xl bg-white p-6 shadow-sm">
              <View className="flex-row items-center justify-between">
                <View className="mr-2 flex-1">
                  <Text className="text-xl font-bold text-black">You are close to your</Text>
                  <Text className="text-xl font-bold text-black">first milestone.</Text>
                  <Text className="mt-2 text-[#FF4F38]">Complete 7 days to achieve this</Text>
                </View>
                <View>
                  <Image
                    source={require('../assets/medal.png')}
                    style={{ width: 60, height: 60 }}
                    resizeMode="contain"
                  />
                </View>
              </View>
            </View>

            {/* Current Streak Card */}
            <View className="mb-4 rounded-3xl bg-white p-6 shadow-sm">
              <View className="mb-4 flex-row items-center justify-between">
                <Text className="text-xl font-bold text-black">Your current streak</Text>
                <TouchableOpacity className="rounded-full border border-[#FF4F38] px-6 py-2">
                  <Text className="text-[#FF4F38]">Go to Leaderboard</Text>
                </TouchableOpacity>
              </View>

              <View className="flex-row items-center justify-between">
                <View className="flex-row items-center">
                  <View className="mr-2 h-3 w-3 rounded-full bg-green-500" />
                  <Text className="text-gray-600">{user.name}</Text>
                </View>
                <Text className="text-gray-600">Day {user.streak}</Text>
              </View>

              {user.hasPartner && (
                <View className="mt-2 flex-row items-center justify-between">
                  <View className="flex-row items-center">
                    <View className="mr-2 h-3 w-3 rounded-full bg-orange-500" />
                    <Text className="text-[#FF6B00]">Partner acceptance pending</Text>
                  </View>
                  <Text className="text-gray-600">Day 0</Text>
                </View>
              )}
            </View>
          </>
        )}
      </ScrollView>
    </View>
  );
}
