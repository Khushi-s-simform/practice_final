import Custombtn from "@/components/custombtn";
import CustomInput from "@/components/customInput";
import React, { useRef, useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Form = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [error, setError] = useState<Record<string, string>>({});
  const [submitData, setSubmitData] = useState(false);

  const nameRef = useRef<TextInput>(null);
  const emailRef = useRef<TextInput>(null);
  const phoneRef = useRef<TextInput>(null);
  const addressRef = useRef<TextInput>(null);

  const validateInputs = () => {
    let errors: Record<string, string> = {};

    if (!name.trim()) {
      errors.name = "Name is required";
    }
    if (!email.trim()) {
      errors.email = "Email is required";
    }
    if (!phone.trim()) {
      errors.phone = "Phone number is required";
    }
    if (!address.trim()) {
      errors.address = "Address is required";
    }
    setError(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = () => {
    if (!validateInputs()) {
      return;
    }
    setSubmitData(true);
    console.log(name, email, phone, address);
    Alert.alert("submitted");
  };
  return (
    <SafeAreaView>
      <ScrollView>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "height" : "padding"}
        >
          <CustomInput
            label="Name"
            value={name}
            onChangeText={setName}
            returnKeyType="next"
            ref={nameRef}
            onSubmitEditing={() => emailRef.current?.focus()}
            error={error.name}
          />
          <CustomInput
            label="Email"
            value={email}
            onChangeText={setEmail}
            returnKeyType="next"
            ref={emailRef}
            onSubmitEditing={() => phoneRef.current?.focus()}
            error={error.email}
          />
          <CustomInput
            label="Phone"
            keyboardType="numeric"
            value={phone}
            returnKeyType="next"
            onChangeText={setPhone}
            ref={phoneRef}
            onSubmitEditing={() => addressRef.current?.focus()}
            error={error.phone}
          />
          <CustomInput
            label="Address"
            value={address}
            error={error.address}
            onChangeText={setAddress}
            returnKeyType="done"
            ref={addressRef}
            onSubmitEditing={handleSubmit}
          />
          <Custombtn label="Submit" onPress={handleSubmit} />
        </KeyboardAvoidingView>
      </ScrollView>

      {/*  <Button title="Submit" onPress={handleSubmit} /> */}

      {submitData && (
        <View>
          <Text>{name}</Text>
          <Text>{email}</Text>
          <Text>{phone}</Text>
          <Text>{address}</Text>
        </View>
      )}
    </SafeAreaView>
  );
};

export default Form;
