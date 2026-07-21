import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
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
  formContainer: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    marginBottom: 30,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: {
      width: 0,
      height: 5,
    },
    elevation: 5,
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
  expenseCard: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    elevation: 5,
  },
  expenseTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  expenseAmount: {
    fontSize: 16,
    color: "#3B82F6",
    marginBottom: 5,
  },
  expensePaidBy: {
    fontSize: 14,
    color: "gray",
  },
  totalAmountContainer: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: {
      width: 0,
      height: 5,
    },
    elevation: 5,
  },
  totalAmountText: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },

  splitAmountContainer: {
   
    marginTop: 20,
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    elevation: 3,
  },

  splitHeading: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 15,
    color: "#222",
  },

  balanceCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#F7F8FA",
    padding: 14,
    borderRadius: 12,
    marginBottom: 12,
  },

  personName: {
    fontSize: 18,
    fontWeight: "600",
    color: "#222",
  },

  paidText: {
    fontSize: 14,
    color: "#666",
    marginTop: 4,
  },

  getText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#2E7D32",
  },

  oweText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#D32F2F",
  },
});

export default styles;
