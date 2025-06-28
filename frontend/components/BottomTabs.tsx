// components/BottomTabs.tsx
import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from 'navigation/types';

const tabs = [
  { name: 'Home', icon: '🏆' },
  { name: 'Leaderboard', icon: '📊' },
  { name: 'Explore', icon: '🧭' },
  { name: 'Profile', icon: '👤' },
];

type BottomTabsNavProp = NativeStackNavigationProp<RootStackParamList, 'Leaderboard'>;

const BottomTabs = () => {
  const [activeTab, setActiveTab] = useState('Home');
  const navigation = useNavigation<BottomTabsNavProp>();

  const handleTabPress = (tabName: string) => {
    setActiveTab(tabName);

    if (tabName === 'Leaderboard') {
      navigation.navigate('Leaderboard');
    }
  };

  return (
    <View className="h-16 flex-row items-center justify-around border-t border-gray-200 bg-white">
      {tabs.map((tab) => (
        <TouchableOpacity
          key={tab.name}
          onPress={() => handleTabPress(tab.name)}
          className={`items-center justify-center rounded-xl px-3 py-2 ${
            activeTab === tab.name ? 'bg-gray-200' : ''
          }`}>
          <Text className="text-xl">{tab.icon}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default BottomTabs;
