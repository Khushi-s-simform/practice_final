import CustomInput from "@/components/customInput";
import formSteps from "@/data/FormSteps";
import React, { useRef, useState } from "react";
import {
  Button,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ReviewScreen from "./ReviewScreen";

const MultipartForm = () => {
  const [currentStep, setCurrentStep] = useState(0);

  const inputRefs = useRef<TextInput[]>([]);
  
  const [formData, setFormData] = useState({
    firstName: "khushi ",
    lastName: "shah",
    email: "k@gmail.com",
    phone: "7894561231",

    company: "simform",
    designation: "trainee",
    experience: "1",
    salary: "1",

    country: "india",
    state: "gujarate",
    city: "surat",
    pincode: "395006",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  if (currentStep === formSteps.length) {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <ReviewScreen
          formData={formData}
          onEdit={() => setCurrentStep(formSteps.length - 1)}
          onSubmit={() => {
            console.log(formData);

            alert("Form Submitted Successfully!");

            setFormData({
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

            setErrors({});
            setCurrentStep(0);
          }}
        />
      </SafeAreaView>
    );
  }
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

  const validateStep = () => {
    const newErrors: Record<string, string> = {};

    currentForm.fields.forEach((field) => {
      const value = formData[field.key as keyof typeof formData];

      if (field.required && !value.trim()) {
        newErrors[field.key] = `${field.label} is required`;
        return;
      }

      if (
        field.validation === "email" &&
        value &&
        !/\S+@\S+\.\S+/.test(value)
      ) {
        newErrors[field.key] = "Enter a valid email";
      }

      if (field.validation === "phone" && value && value.length !== 10) {
        newErrors[field.key] = "Phone must be 10 digits";
      }

      if (field.validation === "number" && value && Number(value) < 0) {
        newErrors[field.key] = "Enter a valid number";
      }
    });

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (!validateStep()) return;

    if (currentStep < formSteps.length) {
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
          {currentForm.fields.map((field, index) => (
            <CustomInput
              key={field.key}
              ref={(ref) => {
                if (ref) {
                  inputRefs.current[index] = ref;
                }
              }}
              label={field.label}
              placeholder={field.placeholder}
              keyboardType={field.keyboardType}
              value={formData[field.key as keyof typeof formData]}
              onChangeText={(text) => handleChange(field.key, text)}
              error={errors[field.key]}
              returnKeyType={
                index === currentForm.fields.length - 1 ? "done" : "next"
              }
              onSubmitEditing={() => {
                if (index < currentForm.fields.length - 1) {
                  inputRefs.current[index + 1]?.focus();
                } else {
                  handleNext();
                }
              }}
            />
          ))}
        </ScrollView>
      </KeyboardAvoidingView>

      <View style={styles.buttonContainer}>
        {currentStep > 0 && (
          <Button title="Previous" onPress={handlePrevious} />
        )}

        <Button
          title={currentStep === formSteps.length - 1 ? "Review" : "Next"}
          onPress={handleNext}
        />
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
