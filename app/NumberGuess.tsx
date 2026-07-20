import React from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const NumberGuessGame = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.heading}>🎯 Number Guessing Game</Text>

      <Text style={styles.subHeading}>Guess a number between 1 and 100</Text>

      <TextInput
        placeholder="Enter your guess"
        keyboardType="numeric"
        style={styles.input}
      />

      <Pressable style={styles.button}>
        <Text style={styles.buttonText}>Guess</Text>
      </Pressable>

      <View style={styles.resultContainer}>
        <Text style={styles.label}>Attempts</Text>
        <Text style={styles.value}>0</Text>
      </View>

      <View style={styles.messageContainer}>
        <Text style={styles.message}>Your result will appear here.</Text>
      </View>

      <Pressable style={styles.resetButton}>
        <Text style={styles.resetText}>Play Again</Text>
      </Pressable>
    </SafeAreaView>
  );
};

export default NumberGuessGame;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    backgroundColor: "#F5F5F5",
  },

  heading: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },

  subHeading: {
    fontSize: 16,
    textAlign: "center",
    color: "gray",
    marginBottom: 30,
  },

  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    backgroundColor: "#fff",
    padding: 15,
    fontSize: 18,
    marginBottom: 20,
  },

  button: {
    backgroundColor: "#3B82F6",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 30,
  },

  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 18,
  },

  resultContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
    paddingHorizontal: 10,
  },

  label: {
    fontSize: 18,
    fontWeight: "600",
  },

  value: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#3B82F6",
  },

  messageContainer: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 30,
    minHeight: 80,
    justifyContent: "center",
  },

  message: {
    fontSize: 18,
    fontWeight: "600",
    textAlign: "center",
  },

  resetButton: {
    backgroundColor: "#10B981",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },

  resetText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 18,
  },
});
