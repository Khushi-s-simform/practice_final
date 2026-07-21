import CustomInput from "@/components/customInput";
import { Split } from "@/types/split";
import React, { useRef, useState } from "react";
import { FlatList, Pressable, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "./SplitwiseStyle";

const Splitwise = () => {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [paidBy, setPaidBy] = useState("");
  const [step, setStep] = useState(1);
  const [expenses, setExpenses] = useState<Split[]>([]);
  const inputRefs = useRef<TextInput[]>([]);
  const [submitted, setSubmitted] = useState(false);

  const validateInputs = () => {
    if (!title.trim()) {
      return `title is required`;
    }
    if (!amount.trim()) {
      return `amount is required`;
    }
    if (!paidBy.trim()) {
      return `paid by is required`;
    }
    if (isNaN(Number(amount))) {
      return `amount must be a number`;
    }
    return null;
  };

  const handleAddExpense = () => {
    const newExpense: Split = {
      id: expenses.length + 1,
      title,
      amount: parseFloat(amount),
      paidby: paidBy,
    };
    setSubmitted(true);
    const validationError = validateInputs();
    if (validationError) {
      return;
    }
    setExpenses([...expenses, newExpense]);

    setTitle("");
    setAmount("");
    setPaidBy("");
    setStep(1);
  };

  const deleteExpense = (id: number) => {
    setExpenses(expenses.filter((expense) => expense.id !== id));
  };

  const totalAmount = expenses.reduce(
    (total, expense) => total + expense.amount,
    0,
  );

  const paidAmounts: Record<string, number> = {};

  expenses.forEach((expense) => {
    paidAmounts[expense.paidby] =
      (paidAmounts[expense.paidby] || 0) + expense.amount;
  });
  const people = Object.keys(paidAmounts);

  const eachShare = totalAmount / people.length;

  const balances = people.map((person) => ({
    name: person,
    paid: paidAmounts[person],
    balance: paidAmounts[person] - eachShare,
  }));

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.heading}>Splitwise</Text>
      <Text style={styles.subHeading}>Split your expenses with ease</Text>
      <FlatList
        ListHeaderComponent={
          <View style={styles.formContainer}>
            {step >= 1 && (
              <CustomInput
                label="Expense title"
                placeholder="title"
                value={title}
                returnKeyType="next"
                ref={(ref) => {
                  if (ref) {
                    inputRefs.current[0] = ref;
                  }
                }}
                onSubmitEditing={() => {
                  setStep(2);
                  setTimeout(() => {
                    inputRefs.current[1]?.focus();
                  }, 0);
                }}
                onChangeText={setTitle}
                error={
                  submitted && validateInputs() === "title is required"
                    ? "Title is required"
                    : undefined
                }
              />
            )}
            {step >= 2 && (
              <CustomInput
                label="Amount"
                placeholder="amount"
                keyboardType="numeric"
                value={amount}
                returnKeyType="next"
                ref={(ref) => {
                  if (ref) {
                    inputRefs.current[1] = ref;
                  }
                }}
                onSubmitEditing={() => {
                  setStep(3);
                  setTimeout(() => {
                    inputRefs.current[2]?.focus();
                  }, 0);
                }}
                onChangeText={setAmount}
                error={
                  submitted && validateInputs() === "amount is required"
                    ? "Amount is required"
                    : submitted &&
                        validateInputs() === "amount must be a number"
                      ? "Amount must be a number"
                      : undefined
                }
              />
            )}
            {step >= 3 && (
              <CustomInput
                label="Paid by"
                placeholder="payer name"
                returnKeyType="done"
                value={paidBy}
                ref={(ref) => {
                  if (ref) {
                    inputRefs.current[2] = ref;
                  }
                }}
                onSubmitEditing={() => {
                  handleAddExpense();
                }}
                onChangeText={setPaidBy}
                error={
                  submitted && validateInputs() === "paid by is required"
                    ? "Paid by is required"
                    : undefined
                }
              />
            )}
            <Pressable
              style={styles.button}
              onPress={() => {
                handleAddExpense();
              }}
            >
              <Text style={styles.buttonText}>Add Expense</Text>
            </Pressable>
          </View>
        }
        data={expenses}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <View style={styles.expenseCard}>
            <Text style={styles.expenseTitle}>{item.title}</Text>
            <Text style={styles.expenseAmount}>${item.amount.toFixed(2)}</Text>
            <Text style={styles.expensePaidBy}>Paid by: {item.paidby}</Text>
            <Pressable
              onPress={() => deleteExpense(item.id)}
              style={styles.deleteButton}
            >
              <Text style={styles.deleteText}>Delete</Text>
            </Pressable>
          </View>
        )}
        ListFooterComponent={
          <View style={styles.splitAmountContainer}>
            <Text style={styles.splitHeading}>Balances</Text>

            <FlatList
              data={balances}
              keyExtractor={(item) => item.name}
              scrollEnabled={false}
              renderItem={({ item }) => (
                <View style={styles.balanceCard}>
                  <View>
                    <Text style={styles.personName}>{item.name}</Text>
                    <Text style={styles.paidText}>
                      Paid ₹{item.paid.toFixed(2)}
                    </Text>
                  </View>

                  <View>
                    {item.balance >= 0 ? (
                      <Text style={styles.getText}>
                        Gets ₹{item.balance.toFixed(2)}
                      </Text>
                    ) : (
                      <Text style={styles.oweText}>
                        Owes ₹{Math.abs(item.balance).toFixed(2)}
                      </Text>
                    )}
                  </View>
                </View>
              )}
            />
          </View>
        }
      />

      <View style={styles.totalAmountContainer}>
        <Text style={styles.totalAmountText}>
          Total Amount: ${totalAmount.toFixed(2)}
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default Splitwise;
