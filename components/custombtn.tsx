import { Pressable, StyleSheet, Text } from "react-native";

type Props = {
  label: string;
  onPress: () => void;
};

const Custombtn = ({ label, onPress }: Props) => {
  return (
    <Pressable onPress={onPress} style={styles.btnContainer}>
      <Text style={styles.Text}>{label}</Text>
    </Pressable>
  );
};

export default Custombtn;

const styles = StyleSheet.create({
  btnContainer: {
    backgroundColor: "blue",
    height: 40,
    margin: 15,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
  },
  Text: {
    color: "white",
    fontSize: 18,
    fontWeight: "600",
  },
});
