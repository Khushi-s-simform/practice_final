export interface Expense {
  id: number;
  title: string;
  amount: number;
  category: "Food" | "Travel" | "Shopping" | "Bills" | "Entertainment";
  date: string;
}