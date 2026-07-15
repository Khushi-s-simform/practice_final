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

export default function ExpenseTracker() {
  const [expenses, setExpenses] = useState<Expense[]>(expenseData);
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [search, setSearch] = useState("");

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Food":
        return "#FF9800";

      case "Travel":
        return "#3B82F6";

      case "Shopping":
        return "#8B5CF6";

      case "Bills":
        return "#EF4444";

      default:
        return "#10B981";
    }
  };
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
            <View style={styles.summaryRow}>
              <View style={styles.summaryCard}>
                <Ionicons name="wallet" size={25} color="#2563EB" />

                <Text style={styles.summaryTitle}>Total</Text>

                <Text style={styles.summaryValue}>₹ {totalExpense}</Text>
              </View>

              <View style={styles.summaryCard}>
                <Ionicons name="trending-up" size={25} color="#10B981" />

                <Text style={styles.summaryTitle}>Highest</Text>

                <Text style={styles.summaryValue}>
                  ₹ {heighestExpense?.amount ?? 0}
                </Text>
              </View>
            </View>
          </>
        }
        renderItem={({ item }) => (
          <View style={styles.expenseCard}>
            <View style={{ flex: 1 }}>
              <Text style={styles.expenseTitle}>{item.title}</Text>

              <View
                style={{
                  backgroundColor: getCategoryColor(item.category),
                  paddingHorizontal: 10,
                  paddingVertical: 5,
                  borderRadius: 15,
                  alignSelf: "flex-start",
                  marginTop: 8,
                }}
              >
                <Text style={{ color: "#fff" }}>{item.category}</Text>
              </View>

              <Text style={styles.date}>{item.date}</Text>
            </View>

            <View style={{ alignItems: "flex-end" }}>
              <Text style={styles.amount}>₹ {item.amount}</Text>

              <Ionicons
                name="trash"
                size={22}
                color="red"
                onPress={() => deleteExpense(item.id)}
              />
            </View>
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
    borderRadius: 25,
    paddingHorizontal: 15,
    alignItems: "center",
    flexDirection: "row",
    elevation: 2,
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
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },

  summaryCard: {
    width: "48%",
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 18,
    elevation: 3,
  },

  summaryTitle: {
    marginTop: 10,
    color: "#666",
  },

  summaryValue: {
    marginTop: 8,
    fontSize: 24,
    fontWeight: "bold",
  },
  expenseCard: {
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 18,
    marginBottom: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    elevation: 3,
  },

  expenseTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },

  category: {
    color: "#666",
    marginTop: 5,
  },

  date: {
    color: "#999",
    marginTop: 3,
  },

  amount: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#2563EB",
    marginBottom: 15,
  },
});
