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
  }
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
    setHabits(habits.map(habit => 
      habit.id === habitId 
        ? {
            ...habit, 
            lastCompleted: new Date().toISOString(), 
            streak: habit.streak + 1,
            daysCompleted: habit.daysCompleted + 1
          } 
        : habit
    ));
    
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
      <View className="p-6 pt-14 pb-6 bg-[#F4F4F2] flex-row justify-between items-center">
        <View>
          <Text className="text-[#3C2A21] text-3xl font-bold">Welcome {user.name}</Text>
          <Text className="text-[#3C2A21] text-lg mt-1">Ready to build your first streak!</Text>
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
            {habits.map(habit => (
              <View key={habit.id} className="bg-white rounded-3xl p-6 mb-4 shadow-sm">
                <View className="flex-row justify-between">
                  <Text className="text-[#FF4F38] font-semibold">Habit</Text>
                  <TouchableOpacity className="bg-white border border-[#FF4F38] rounded-full px-4 py-1">
                    <Text className="text-[#FF4F38]">Find a partner</Text>
                  </TouchableOpacity>
                </View>
                
                <Text className="text-black text-3xl font-bold mt-2">{habit.name}</Text>
                <Text className="text-gray-500 mt-1 mb-4">Daily reading: simple, sustainable, boosts focus, increases knowledge.</Text>
                
                <View className="bg-[#FFF1EC] rounded-xl p-5 mb-4">
                  <View className="flex-row justify-between mb-4">
                    <Text className="text-gray-600">Start</Text>
                    <Text className="text-gray-500 font-medium">LEVEL 1</Text>
                  </View>
                  
                  {/* Progress bar container */}
                  <View className="relative h-3 mb-4">
                    {/* Base line */}
                    <View className="absolute left-0 right-0 h-[3px] bg-white top-1/2 -translate-y-1/2 rounded-full" />
                    
                    {/* Active portion of the bar */}
                    <View 
                      className="absolute left-0 h-[3px] bg-[#FF4F38] top-1/2 -translate-y-1/2 rounded-full"
                      style={{ width: '5%' }}
                    />
                    
                    {/* Orange indicator dot */}
                    <View className="absolute left-[5%] -ml-[6px] h-[14px] w-[14px] rounded-full bg-[#FF4F38] top-1/2 -translate-y-1/2" />
                  </View>
                  
                  {/* Day labels */}
                  <View className="flex-row justify-between">
                    <TouchableOpacity 
                      onPress={() => selectGoal(7)}
                      className="items-center">
                      <Text className="text-gray-700 text-sm">7 Days</Text>
                    </TouchableOpacity>
                    
                    <TouchableOpacity 
                      onPress={() => selectGoal(14)}
                      className="items-center">
                      <Text className="text-gray-700 text-sm">14 Days</Text>
                    </TouchableOpacity>
                    
                    <TouchableOpacity 
                      onPress={() => selectGoal(21)}
                      className="items-center">
                      <Text className="text-gray-700 text-sm">21 Days</Text>
                    </TouchableOpacity>
                  </View>
                </View>
                
                <View className="flex-row justify-between items-center">
                  <View className="flex-row items-center">
                    <View className="flex-row">
                      {/* First avatar with border for layering effect */}
                      <View className="bg-gray-200 rounded-full h-10 w-10 items-center justify-center overflow-hidden border border-white" style={{ zIndex: 0 }}>
                        <Image 
                          source={require('../assets/avatar-1.png')} 
                          style={{ width: 28, height: 28, borderRadius: 14 }}
                          defaultSource={require('../assets/avatar-1.png')}
                        />
                      </View>
                      
                      {/* Second avatar positioned with negative margin to create overlap */}
                      <View className="bg-gray-200 rounded-full h-10 w-10 items-center justify-center overflow-hidden -ml-6 mr-2 border border-white" style={{ zIndex: 1 }}>
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
                    className="bg-[#FF4F38] rounded-full px-8 py-3"
                    onPress={() => !isCompletedToday(habit.lastCompleted) && checkIn(habit.id)}
                  >
                    <Text className="text-white font-semibold">Check in</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
            
            {/* Milestone Card */}
            <View className="bg-white rounded-3xl p-6 mb-4 shadow-sm">
              <View className="flex-row justify-between items-center">
                <View className="flex-1 mr-2">
                  <Text className="text-black text-xl font-bold">You are close to your</Text>
                  <Text className="text-black text-xl font-bold">first milestone.</Text>
                  <Text className="text-[#FF4F38] mt-2">Complete 7 days to achieve this</Text>
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
            <View className="bg-white rounded-3xl p-6 mb-4 shadow-sm">
              <View className="flex-row justify-between items-center mb-4">
                <Text className="text-black text-xl font-bold">Your current streak</Text>
                <TouchableOpacity className="border border-[#FF4F38] rounded-full px-6 py-2">
                  <Text className="text-[#FF4F38]">Go to Leaderboard</Text>
                </TouchableOpacity>
              </View>
              
              <View className="flex-row items-center justify-between">
                <View className="flex-row items-center">
                  <View className="h-3 w-3 rounded-full bg-green-500 mr-2" />
                  <Text className="text-gray-600">{user.name}</Text>
                </View>
                <Text className="text-gray-600">Day {user.streak}</Text>
              </View>
              
              {user.hasPartner && (
                <View className="flex-row items-center justify-between mt-2">
                  <View className="flex-row items-center">
                    <View className="h-3 w-3 rounded-full bg-orange-500 mr-2" />
                    <Text className="text-[#FF6B00]">Partner acceptance pending</Text>
                  </View>
                  <Text className="text-gray-600">Day 0</Text>
                </View>
              )}
            </View>
          </>
        )}
      </ScrollView>
      
      {/* Bottom Navigation */}
      <View className="flex-row justify-around items-center border-t border-gray-200 py-4 bg-white">
        <TouchableOpacity className="items-center">
          <Text className="text-2xl">🏆</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          className="items-center bg-gray-200 px-6 py-3 rounded-xl"
          onPress={() => navigation.navigate('ChooseHabit')}
        >
          <Text className="text-xl">📊</Text>
        </TouchableOpacity>
        
        <TouchableOpacity className="items-center">
          <Text className="text-2xl">📍</Text>
        </TouchableOpacity>
        
        <TouchableOpacity className="items-center">
          <Text className="text-2xl">👤</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
