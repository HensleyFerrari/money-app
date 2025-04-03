import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ArrowUp, ArrowDown } from "lucide-react";

interface Transaction {
  _id: string;
  description: string;
  amount: number;
  type: "income" | "expense";
  category: string;
  date: string;
}

interface TransactionCardProps {
  transaction: Transaction;
}

export default function TransactionCard({ transaction }: TransactionCardProps) {
  const typeColor =
    transaction.type === "income" ? "text-green-500" : "text-red-500";
  const bgColor = transaction.type === "income" ? "bg-green-100" : "bg-red-100";
  return (
    <Card className={`w-72 transition-shadow duration-300 ${bgColor}`}>
      <CardHeader className="flex items-center">
        {transaction.type === "income" ? (
          <ArrowUp className="text-green-500 mr-2" />
        ) : (
          <ArrowDown className="text-red-500 mr-2" />
        )}
        <CardTitle className="text-lg font-bold">
          {transaction.description}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className={typeColor}>
          {transaction.type === "income" ? "Entrada" : "Gasto"}: R${" "}
          {transaction.amount.toFixed(2)}
        </p>
        <p className="text-sm text-muted-foreground">
          Categoria: {transaction.category}
        </p>
        <p className="text-xs text-muted-foreground">
          Data: {new Date(transaction.date).toLocaleDateString()}
        </p>
      </CardContent>
    </Card>
  );
}
