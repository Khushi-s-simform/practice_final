import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";

type Props = {
  formData: any;
  onEdit: () => void;
  onSubmit: () => void;
};

const ReviewScreen = ({ formData, onEdit, onSubmit }: Props) => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>Review Your Details</Text>

      {Object.entries(formData).map(([key, value]) => (
        <View key={key} style={styles.row}>
          <Text style={styles.label}>{key}</Text>
          <Text style={styles.value}>
            {typeof value === "boolean"
              ? value
                ? "Yes"
                : "No"
              : String(value)}
          </Text>
        </View>
      ))}

      <TouchableOpacity style={styles.editBtn} onPress={onEdit}>
        <Text style={styles.btnText}>Edit</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.submitBtn} onPress={onSubmit}>
        <Text style={styles.btnText}>Submit</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default ReviewScreen;

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  label: {
    fontWeight: "600",
    textTransform: "capitalize",
  },
  value: {
    color: "#555",
    maxWidth: "55%",
    textAlign: "right",
  },
  editBtn: {
    backgroundColor: "#FF9800",
    padding: 15,
    borderRadius: 8,
    marginTop: 30,
  },
  submitBtn: {
    backgroundColor: "#4CAF50",
    padding: 15,
    borderRadius: 8,
    marginTop: 15,
  },
  btnText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 16,
  },
});