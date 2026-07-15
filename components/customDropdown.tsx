import React, { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

interface Props {
  label: string;
  options: string[];
  value: string;
  onChange: (value: string) => void;
}

const CustomDropdown = ({ label, options, value, onChange }: Props) => {
  const [open, setOpen] = useState(false);

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>

      <Pressable style={styles.dropdown} onPress={() => setOpen(!open)}>
        <Text>{value || "Select"}</Text>

        <Text>{open ? "▲" : "▼"}</Text>
      </Pressable>

      {open && (
        <View style={styles.optionContainer}>
          {options.map((item) => (
            <Pressable
              key={item}
              style={styles.option}
              onPress={() => {
                onChange(item);
                setOpen(false);
              }}
            >
              <Text>{item}</Text>
            </Pressable>
          ))}
        </View>
      )}
    </View>
  );
};

export default CustomDropdown;

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },

  label: {
    marginBottom: 8,
    fontSize: 16,
    fontWeight: "600",
  },

  dropdown: {
    borderWidth: 1,
    borderColor: "#CCC",
    borderRadius: 8,
    padding: 15,

    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  optionContainer: {
    marginTop: 5,
    borderWidth: 1,
    borderColor: "#DDD",
    borderRadius: 8,
    backgroundColor: "#FFF",
  },

  option: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#EEE",
  },
});
