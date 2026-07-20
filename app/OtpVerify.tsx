import React, { useEffect, useRef, useState } from "react";
import {
  Alert,
  Button,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

const OtpVerify = () => {
  const arr = Array.from({ length: 6 });
  const [Isrunning, setIsRunning] = useState(false);
  const [seconds, setSeconds] = useState(30);
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const inputRefs = useRef<(TextInput | null)[]>([]);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;

    if (Isrunning) {
      interval = setInterval(() => {
        setSeconds((prev) => prev - 1);
      }, 1000);
    }
    if (seconds === 0) {
      setIsRunning(false);
    }
    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [Isrunning, seconds]);

  const minutes = Math.floor((seconds % 3600) / 60);
  const second = seconds % 60;

  const handleStart = () => {
    setSeconds(30);
    setIsRunning(true);
  };

  const handleResent = () => {
    setSeconds(30);
    setIsRunning(true);
  };

  const handleChange = (text: string, index: number) => {
    if (!/^\d?$/.test(text)) {
      return;
    }

    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);

    if (text && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleBackspace = (key: string, index: number) => {
    if (key === "Backspace" && otp[index] === "" && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerify = () => {
    let StaticOtp = "123456";
    if (otp.length === 6) {
      const enteredOtp = otp.join("");
      console.log(enteredOtp);

      if (enteredOtp === StaticOtp) {
        Alert.alert("OTP has been successfully Verified !!");
        setIsRunning(false);
      } else {
        Alert.alert("Wrong OTP !!");
      }
    }
  };

  return (
    <View>
      <View style={styles.header}>
        <Text style={styles.HeaderText}>OTP Verification</Text>
      </View>
      <View style={styles.title}>
        <Text>Enter the 6-digit code sent to your email</Text>
      </View>
      <View style={styles.otpContainer}>
        {arr.map((_, index) => (
          <TextInput 
            key={index}
            ref={(ref) => {
              inputRefs.current[index] = ref;
            }}
            style={styles.input}
            keyboardType="number-pad"
            maxLength={1}
            textAlign="center"
            value={otp[index]}
            onChangeText={(text) => handleChange(text, index)}
            onKeyPress={({ nativeEvent }) =>
              handleBackspace(nativeEvent.key, index)
            }
          />
        ))}
      </View>
      <View style={{ alignItems: "center", marginTop: 20 }}>
        {Isrunning ? (
          <Text style={{ fontSize: 18 }}>
            {minutes.toString().padStart(2, "0")} :
            {second.toString().padStart(2, "0")}
          </Text>
        ) : (
          <Pressable onPress={seconds === 30 ? handleStart : handleResent}>
            <Text>{seconds === 30 ? "Send OTP" : "Resend OTP"}</Text>
          </Pressable>
        )}
      </View>

      <View>
        <Button title="Verify " onPress={() => handleVerify()} />
      </View>
    </View>
  );
};

export default OtpVerify;

const styles = StyleSheet.create({
  header: {
    alignItems: "center",
    backgroundColor: "darkblue",
    height: 100,
    justifyContent: "flex-end",
    paddingBottom: 10,
  },
  HeaderText: {
    fontSize: 18,
    color: "#ffffff",
    fontWeight: "400",
  },
  title: {
    justifyContent: "center",
    marginTop: 20,
    alignItems: "center",
  },
  otpContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 30,
    paddingHorizontal: 20,
  },

  input: {
    width: 50,
    height: 55,
    borderWidth: 1,
    borderColor: "#1E3A8A",
    borderRadius: 10,
    fontSize: 22,
    fontWeight: "600",
    backgroundColor: "#fff",
  },
});
