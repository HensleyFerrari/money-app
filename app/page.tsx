"use client";
import { useState, useEffect } from "react";
import TransactionForm from "../components/TransactionForm";
import TransactionList from "../components/TransactionList";
import ChartsPage from "./charts";
interface Transaction {
  _id: string;
  description: string;
  amount: number;
  type: "income" | "expense";
  category: string;
  date: string;
}

export default function HomePage() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    fetch("/api/transactions")
      .then((res) => res.json())
      .then((data) => setTransactions(data))
      .catch((err) => console.error(err));
  }, []);

  const addTransaction = (newTrans: Transaction) => {
    setTransactions((prev) => [newTrans, ...prev]);
  };

  return (
    <main className="p-4 max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Controle Financeiro</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <TransactionForm onAdd={addTransaction} />
        </div>
        <div>
          <ChartsPage />
        </div>
      </div>
      <div className="mt-4">
        <TransactionList transactions={transactions} />
      </div>
    </main>
  );
}
