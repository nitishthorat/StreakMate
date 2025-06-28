import React, { useEffect } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  Image, 
  StyleSheet,
  Dimensions,
  ImageBackground
} from 'react-native';
import { useNavigation, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';

type CelebrationRouteProp = RouteProp<RootStackParamList, 'Celebration'>;
type CelebrationNavProp = NativeStackNavigationProp<RootStackParamList, 'Celebration'>;

type Props = {
  route: CelebrationRouteProp;
}

export default function CelebrationScreen({ route }: Props) {
  const { 
    habitName, 
    currentStreak, 
    daysCompleted, 
    goalDays, 
    hasPartner, 
    partnerCheckedIn 
  } = route.params;
  
  const navigation = useNavigation<CelebrationNavProp>();
  const remainingDays = goalDays - daysCompleted;
  
  const handleContinue = () => {
    navigation.navigate('Dashboard');
  };
  
  return (
    <View style={styles.container}>
      {/* Celebration Top Section with Orange Background */}
      <View style={styles.celebrationSection}>
        {/* Celebration GIF above the text */}
        <View style={styles.gifContainer}>
          <Image 
            source={require('../assets/celebration.gif')} 
            style={styles.gifImage}
            resizeMode="contain"
          />
        </View>
        
        <View style={styles.celebrationContent}>
          <Text style={styles.titleText}>You're checked in</Text>
          <Text style={styles.dayText}>Day {currentStreak} in bag</Text>
          
          <View style={styles.motivationContainer}>
            <Text style={styles.streakText}>Keep the streak alive 🔥 —</Text>
            <Text style={styles.crushingText}>You're crushing it!</Text>
          </View>
          
          <Image 
            source={require('../assets/trophy.png')}
            style={styles.trophyIcon}
            resizeMode="contain"
          />
        </View>
      </View>
      
      {/* Badge Progress Section */}
      <View style={styles.badgeCard}>
        <View style={styles.badgeContent}>
          <Image 
            source={require('../assets/fish-badge.png')}
            style={styles.badgeIcon}
            resizeMode="contain"
          />
          <View style={styles.badgeTextContainer}>
            <Text style={styles.badgeTitle}>{remainingDays} more days to earn Bronze badge!</Text>
            <Text style={styles.badgeSubText}>You are close to your first milestone.</Text>
          </View>
        </View>
      </View>
      
      {/* Partner Status Section - Only show if hasPartner is true */}
      {hasPartner && !partnerCheckedIn && (
      <View style={styles.partnerCard}>
        <View style={styles.partnerContent}>
          <View style={{flex: 1, paddingRight: 8}}>
            <Text style={styles.partnerTitle}>Your partner hasn't checked in yet</Text>
            <Text style={styles.partnerSubText}>Let's send them a nudge</Text>
          </View>
          <TouchableOpacity style={styles.nudgeButton}>
            <Text style={styles.nudgeText}>Send a Nudge</Text>
          </TouchableOpacity>
        </View>
      </View>
      )}      
      {/* Continue Button */}
      <TouchableOpacity style={styles.continueButton} onPress={handleContinue}>
        <Text style={styles.continueText}>Continue</Text>
        <Text style={styles.arrowIcon}>→</Text>
      </TouchableOpacity>
    </View>
  );
}

const { width } = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  celebrationSection: {
    width: '100%',
    height: 550, // Increased height to accommodate the GIF above text
    backgroundColor: '#FF4F38',
    alignItems: 'center',
    justifyContent: 'flex-start', // Changed to start from top
    overflow: 'hidden',
  },
  gifContainer: {
    width: '100%',
    height: 140, // Reduced height to decrease space
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20, // Space from top
    marginBottom: -10, // Negative margin to pull text up closer to the GIF
  },
  gifImage: {
    width: 200, // Adjust based on your GIF aspect ratio
    height: 160,
  },
  celebrationContent: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10, // Reduced padding
    paddingTop: 0, // Remove padding from top to bring text closer to GIF
  },
  titleText: {
    fontSize: 36,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
  dayText: {
    fontSize: 24,
    color: 'white',
    marginTop: 8,
    textAlign: 'center',
  },
  motivationContainer: {
    marginTop: 36,
    alignItems: 'center',
  },
  streakText: {
    fontSize: 20,
    color: 'white',
    textAlign: 'center',
  },
  crushingText: {
    fontSize: 20,
    color: 'white',
    marginTop: 8,
    textAlign: 'center',
  },
  trophyIcon: {
    width: 80,
    height: 80,
    marginTop: 40,
  },
  badgeCard: {
    backgroundColor: 'white',
    borderRadius: 20,
    marginHorizontal: 16,
    marginTop: -60, // Increased negative margin to pull it up more
    padding: 16, // Reduced padding to make card more compact
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  badgeContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  badgeIcon: {
    width: 70,
    height: 70,
    marginRight: 16,
  },
  badgeTextContainer: {
    flex: 1,
  },
  badgeTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
  },
  badgeSubText: {
    fontSize: 14,
    color: '#FF4F38',
    marginTop: 4,
  },
  partnerCard: {
    backgroundColor: 'white',
    borderRadius: 24,
    marginHorizontal: 20,
    marginTop: 12, // Reduced margin to bring it closer to badge card
    padding: 14, // Reduced padding to make card more compact
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
    borderWidth: 1,
    borderColor: '#F2F2F2',
  },
  partnerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  partnerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 2,
  },
  partnerSubText: {
    fontSize: 14,
    color: '#FF4F38',
    marginTop: 2,
  },
  nudgeButton: {
    backgroundColor: '#FF4F38',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 20,
  },
  nudgeText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 16, /* Increased font size */
  },
  continueButton: {
    flexDirection: 'row',
    backgroundColor: '#FF4F38',
    padding: 16,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 24,
    marginTop: 30, // Add specific top margin to create space above button
    marginBottom: 20,
  },
  continueText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginRight: 8,
  },
  arrowIcon: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  }
});
