import CustomInput from "@/components/customInput";
import formSteps from "@/data/FormSteps";
import React, { useState } from "react";
import {
  Button,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const MultipartForm = () => {
  const [currentStep, setCurrentStep] = useState(0);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",

    company: "",
    designation: "",
    experience: "",
    salary: "",

    country: "",
    state: "",
    city: "",
    pincode: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const currentForm = formSteps[currentStep];

  const handleChange = (key: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [key]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [key]: "",
    }));
  };

  const handleNext = () => {
    if (currentStep < formSteps.length - 1) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.heading}>Employee Registration</Text>

      <Text style={styles.step}>
        Step {currentStep + 1} of {formSteps.length}
      </Text>

      <Text style={styles.title}>{currentForm.title}</Text>

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {currentForm.fields.map((field) => (
            <CustomInput
              key={field.key}
              label={field.label}
              placeholder={field.placeholder}
              keyboardType={field.keyboardType}
              value={formData[field.key as keyof typeof formData]}
              onChangeText={(text) => handleChange(field.key, text)}
              error={errors[field.key]}
            />
          ))}
        </ScrollView>
      </KeyboardAvoidingView>

      <View style={styles.buttonContainer}>
        {currentStep > 0 && (
          <Button title="Previous" onPress={handlePrevious} />
        )}

        {currentStep === formSteps.length - 1 ? (
          <Button title="Submit" onPress={() => console.log(formData)} />
        ) : (
          <Button title="Next" onPress={handleNext} />
        )}
      </View>
    </SafeAreaView>
  );
};

export default MultipartForm;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },

  heading: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 8,
  },

  step: {
    color: "gray",
    marginBottom: 10,
  },

  title: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 20,
  },

  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
});