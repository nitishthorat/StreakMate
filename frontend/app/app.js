import { View, Text, StyleSheet, Button } from "react-native";
import React, { useEffect } from "react";
import { useRouter } from "expo-router";

export default function WelcomeScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>StreakMate</Text>

      <View style={styles.buttonWrapper}>
        <Button title="Login" onPress={() => router.push("/login")}></Button>
      </View>

      <View style={styles.buttonWrapper}>
        <Button title="Sign Up" onPress={() => router.push("/signup")}></Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    marginBotton: 40,
  },
  buttonWrapper: {
    width: "80%",
    marginVertical: 10,
  },
});
