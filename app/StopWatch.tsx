import React, { useEffect, useMemo, useState } from "react";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const StopWatch = () => {
  const [totalSeconds, setTotalSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [laps, setLaps] = useState<string[]>([]);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isRunning) {
      interval = setInterval(() => {
        setTotalSeconds((prev) => prev + 1);
      }, 1000);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isRunning]);

  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  const formattedTime = useMemo(() => {
    return `${hours.toString().padStart(2, "0")} : ${minutes
      .toString()
      .padStart(2, "0")} : ${seconds.toString().padStart(2, "0")}`;
  }, [hours, minutes, seconds]);

  const handleStart = () => {
    setIsRunning(true);
  };

  const handlePause = () => {
    setIsRunning(false);
  };

  const handleReset = () => {
    setIsRunning(false);
    setTotalSeconds(0);
    setLaps([]);
  };

  const handleLap = () => {
    setLaps((prev) => [...prev, formattedTime]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.heading}>⏱ Stopwatch</Text>

      <View style={styles.timerCard}>
        <Text style={styles.timer}>{formattedTime}</Text>

        <Text
          style={[styles.status, { color: isRunning ? "#16A34A" : "#EF4444" }]}
        >
          {isRunning ? "🟢 Running" : "🔴 Paused"}
        </Text>
      </View>

      <View style={styles.buttonRow}>
        <Pressable
          style={[
            styles.button,
            styles.startButton,
            isRunning && styles.disabledButton,
          ]}
          onPress={handleStart}
          disabled={isRunning}
        >
          <Text style={styles.buttonText}>Start</Text>
        </Pressable>

        <Pressable
          style={[
            styles.button,
            styles.pauseButton,
            !isRunning && styles.disabledButton,
          ]}
          onPress={handlePause}
          disabled={!isRunning}
        >
          <Text style={styles.buttonText}>Pause</Text>
        </Pressable>

        <Pressable
          style={[styles.button, styles.resetButton]}
          onPress={handleReset}
        >
          <Text style={styles.buttonText}>Reset</Text>
        </Pressable>
      </View>

      <Pressable
        style={[styles.lapButton, !isRunning && styles.disabledButton]}
        onPress={handleLap}
        disabled={!isRunning}
      >
        <Text style={styles.buttonText}>Lap</Text>
      </Pressable>

      <Text style={styles.lapTitle}>Lap History</Text>

      <FlatList
        data={laps}
        keyExtractor={(_, index) => index.toString()}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No laps recorded yet.</Text>
        }
        renderItem={({ item, index }) => (
          <View style={styles.lapCard}>
            <Text style={styles.lapText}>Lap {index + 1}</Text>
            <Text style={styles.lapTime}>{item}</Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
};

export default StopWatch;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4F6FA",
    padding: 20,
  },

  heading: {
    fontSize: 30,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 30,
    color: "#1E293B",
  },

  timerCard: {
    backgroundColor: "#FFFFFF",
    paddingVertical: 45,
    borderRadius: 20,
    alignItems: "center",
    elevation: 5,
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 8,
    shadowOffset: {
      width: 0,
      height: 3,
    },
  },

  timer: {
    fontSize: 42,
    fontWeight: "bold",
    letterSpacing: 3,
    color: "#111827",
  },

  status: {
    marginTop: 15,
    fontSize: 18,
    fontWeight: "600",
  },

  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 35,
  },

  button: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 12,
    marginHorizontal: 5,
    alignItems: "center",
  },

  startButton: {
    backgroundColor: "#3B82F6",
  },

  pauseButton: {
    backgroundColor: "#F59E0B",
  },

  resetButton: {
    backgroundColor: "#EF4444",
  },

  lapButton: {
    backgroundColor: "#8B5CF6",
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 20,
  },

  disabledButton: {
    opacity: 0.5,
  },

  buttonText: {
    color: "#FFFFFF",
    fontWeight: "600",
    fontSize: 16,
  },

  lapTitle: {
    fontSize: 22,
    fontWeight: "700",
    marginTop: 30,
    marginBottom: 15,
    color: "#1E293B",
  },

  lapCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
    elevation: 2,
  },

  lapText: {
    fontSize: 16,
    fontWeight: "600",
  },

  lapTime: {
    fontSize: 16,
    color: "#2563EB",
    fontWeight: "700",
  },

  emptyText: {
    textAlign: "center",
    marginTop: 20,
    color: "#6B7280",
    fontSize: 16,
  },
});
