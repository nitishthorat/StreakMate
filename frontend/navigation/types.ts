export type RootStackParamList = {
  Welcome: undefined;
  UserInfo: undefined;
  ChooseHabit: undefined;
  EnterHabitDetails: undefined;
  Dashboard: undefined;
  Leaderboard: undefined;
  FindPartner: undefined;
  Celebration: {
    habitId: string;
    habitName: string;
    currentStreak: number;
    daysCompleted: number;
    goalDays: number;
    hasPartner: boolean;
    partnerCheckedIn: boolean;
  };
};
