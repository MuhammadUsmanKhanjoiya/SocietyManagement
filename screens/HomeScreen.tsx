import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { auth } from "../firebaseConfig";

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to the Home Screen!</Text>
      {/* <Text style={styles.subtitle}>
        {auth.currentUser ? `Logged in as: ${auth.currentUser.email}` : 'Not logged in'}
      </Text> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 18,
    color: "gray",
  },
});
