"use client";
import { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

interface Transaction {
  _id: string;
  description: string;
  amount: number;
  type: "income" | "expense";
  category: string;
  date: string;
}

export default function ChartsPage() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    fetch("/api/transactions")
      .then((res) => res.json())
      .then((data) => setTransactions(data))
      .catch((err) => console.error(err));
  }, []);

  // Agrega os valores por categoria.
  const categoryData: Record<string, number> = {};
  transactions.forEach((tx) => {
    categoryData[tx.category] = (categoryData[tx.category] || 0) + tx.amount;
  });

  const data = Object.keys(categoryData).map((category) => ({
    name: category,
    value: categoryData[category],
  }));

  return (
    <main className="p-4">
      <Card>
        <CardHeader>
          <CardTitle>Gráficos de Transações</CardTitle>
        </CardHeader>
        <CardContent style={{ backgroundColor: "#fff" }}>
          <BarChart width={500} height={300} data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="value" fill="#4A90E2" />
          </BarChart>
        </CardContent>
      </Card>
    </main>
  );
}
