import CustomDropdown from "@/components/customDropdown";
import { expenses as expenseData } from "@/data/Expense";
import { Ionicons } from "@expo/vector-icons";
import React, { useMemo, useState } from "react";
import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

type Expense = {
  id: number;
  title: string;
  amount: number;
  category: string;
  date: string;
};

export default function Index() {
  const [expenses, setExpenses] = useState<Expense[]>(expenseData);
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [search, setSearch] = useState("");

  const filteredExpenses = useMemo(() => {
    if (!search.trim()) {
      return expenses;
    }

    const text = search.toLowerCase();

    return expenses.filter(
      (expense) =>
        expense.title.toLowerCase().includes(text) ||
        expense.category.toLowerCase().includes(text),
    );
  }, [expenses, search]);

  const addExpense = () => {
    if (!title || !amount || !category) {
      return;
    }

    const newExpense: Expense = {
      id: Date.now(),
      title,
      amount: Number(amount),
      category,
      date: new Date().toLocaleDateString(),
    };

    setExpenses((prev) => [newExpense, ...prev]);

    setTitle("");
    setAmount("");
    setCategory("");
  };

  const deleteExpense = (id: number) => {
    setExpenses((prev) => prev.filter((expense) => expense.id !== id));
  };

  const totalExpense = useMemo(() => {
    return filteredExpenses.reduce(
      (total, expense) => total + expense.amount,
      0,
    );
  }, [filteredExpenses]);

  const heighestExpense = useMemo(() => {
    return filteredExpenses.reduce((heighest, current) =>
      current.amount > heighest.amount ? current : heighest,
    );
  }, [filteredExpenses]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headertext}>Expense Tracker</Text>
      </View>

      <FlatList
        data={filteredExpenses}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          padding: 16,
          paddingBottom: 40,
        }}
        ListHeaderComponent={
          <>
            <View style={styles.searchbar}>
              <Ionicons name="search" size={20} />

              <TextInput
                placeholder="Search Expense..."
                value={search}
                onChangeText={setSearch}
                style={{
                  flex: 1,
                  marginLeft: 10,
                }}
              />
            </View>

            <View style={styles.addBox}>
              <Text style={styles.addTitle}>Add New Expense</Text>

              <View style={styles.AddTopRow}>
                <TextInput
                  placeholder="Expense Title"
                  style={styles.inputbox}
                  value={title}
                  onChangeText={setTitle}
                />

                <TextInput
                  placeholder="$ Amount"
                  keyboardType="numeric"
                  style={styles.inputbox}
                  value={amount}
                  onChangeText={setAmount}
                />
              </View>

              <View style={styles.AddBottomRow}>
                <CustomDropdown
                  label="Category"
                  options={[
                    "Food",
                    "Travel",
                    "Shopping",
                    "Bills",
                    "Entertainment",
                  ]}
                  value={category}
                  onChange={setCategory}
                />

                <Pressable style={styles.addbtn} onPress={addExpense}>
                  <Text style={styles.btnText}>+ Add Expense</Text>
                </Pressable>
              </View>
            </View>
            <View style={styles.TotalBox}>
              <Text>Total Expense : </Text>
              <Text>{totalExpense}</Text>
            </View>
            <View style={styles.TotalBox}>
              <Text>Heighest Expense : </Text>
              <Text>{heighestExpense.amount}</Text>
            </View>
          </>
        }
        renderItem={({ item }) => (
          <View style={styles.expenseCard}>
            <Text style={styles.expenseTitle}>{item.title}</Text>
            <Text>₹ {item.amount}</Text>
            <Text>{item.category}</Text>
            <Text>{item.date}</Text>
            <Ionicons
              name="trash-bin"
              size={20}
              onPress={() => deleteExpense(item.id)}
            />
          </View>
        )}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons name="wallet-outline" size={60} color="gray" />

            <Text style={styles.emptyText}>No Expenses Found</Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4F4F4",
  },

  header: {
    height: 100,
    justifyContent: "flex-end",
    alignItems: "center",
    backgroundColor: "#1E3A8A",
    paddingBottom: 15,
  },

  headertext: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "bold",
  },

  searchbar: {
    height: 50,
    backgroundColor: "#fff",
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    marginBottom: 20,
  },

  addBox: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
  },

  addTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
  },

  AddTopRow: {
    flexDirection: "row",
    gap: 10,
  },

  inputbox: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#DDD",
    borderRadius: 8,
    paddingHorizontal: 12,
    height: 45,
  },

  AddBottomRow: {
    marginTop: 15,
  },

  addbtn: {
    backgroundColor: "#1E3A8A",
    height: 45,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 15,
  },

  btnText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },

  expenseCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 15,
    elevation: 3,
  },

  expenseTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  emptyContainer: {
    alignItems: "center",
    marginTop: 70,
  },

  emptyText: {
    marginTop: 15,
    fontSize: 18,
    color: "gray",
  },
  TotalBox: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    flexDirection: "row",
  },
});
