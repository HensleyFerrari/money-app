"use client";
import { useState, useEffect } from "react";
import TransactionForm from "../components/TransactionForm";
import ChartsPage from "./charts";
import { ThemeProvider, useTheme } from "next-themes";
import { ArrowUpCircle, ArrowDownCircle } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

// Import Shadcn components
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ModeToggle } from "@/components/ui/mode-toggle";
import { Separator } from "@/components/ui/separator";
import {
  Typography,
  TypographyH1,
  TypographyH2,
  TypographyP,
} from "@/components/ui/typography";
import TransactionCard from "@/components/TransactionCard";

interface Transaction {
  _id: string;
  description: string;
  amount: number;
  type: "income" | "expense";
  category: string;
  date: string;
}

function PageContent() {
  const { theme, setTheme } = useTheme();
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

  // Group transactions by type
  const incomeTransactions = transactions.filter((t) => t.type === "income");
  const expenseTransactions = transactions.filter((t) => t.type === "expense");

  return (
    <main className="p-4 max-w-7xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <TypographyH1>Controle Financeiro</TypographyH1>
        <ModeToggle />
      </div>

      <Separator className="my-4" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Nova Transação</CardTitle>
          </CardHeader>
          <CardContent>
            <TransactionForm onAdd={addTransaction} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Estatísticas</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartsPage />
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <ArrowUpCircle className="h-6 w-6 text-green-500" />
            <TypographyH2>Receitas</TypographyH2>
          </div>

          {incomeTransactions.length === 0 ? (
            <Card>
              <CardContent className="pt-6">
                <TypographyP className="text-muted-foreground">
                  Nenhuma receita registrada
                </TypographyP>
              </CardContent>
            </Card>
          ) : (
            incomeTransactions.map((t) => (
              <TransactionCard key={t._id} transaction={t} />
            ))
          )}
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <ArrowDownCircle className="h-6 w-6 text-red-500" />
            <TypographyH2>Despesas</TypographyH2>
          </div>

          {expenseTransactions.length === 0 ? (
            <Card>
              <CardContent className="pt-6">
                <TypographyP className="text-muted-foreground">
                  Nenhuma despesa registrada
                </TypographyP>
              </CardContent>
            </Card>
          ) : (
            expenseTransactions.map((t) => (
              <TransactionCard key={t._id} transaction={t} />
            ))
          )}
        </div>
      </div>
    </main>
  );
}

export default function HomePage() {
  return (
    <ThemeProvider attribute="class">
      <PageContent />
    </ThemeProvider>
  );
}
