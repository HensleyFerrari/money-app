import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowUp, ArrowDown, Calendar, Tag } from "lucide-react";

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
    transaction.type === "income"
      ? "text-green-500 dark:text-green-300"
      : "text-red-500 dark:text-red-300";
  const badgeVariant =
    transaction.type === "income" ? "success" : "destructive";

  return (
    <Card
      className="w-full transition-all duration-300 hover:shadow-md overflow-hidden border-l-4 hover:scale-[1.01]"
      style={{
        borderLeftColor:
          transaction.type === "income"
            ? "var(--success)"
            : "var(--destructive)",
      }}
    >
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg font-semibold truncate pr-2">
            {transaction.description}
          </CardTitle>
          <Badge
            variant={badgeVariant as "success" | "destructive"}
            className="flex items-center gap-1 shrink-0"
          >
            {transaction.type === "income" ? (
              <ArrowUp className="h-3 w-3" />
            ) : (
              <ArrowDown className="h-3 w-3" />
            )}
            {transaction.type === "income" ? "Entrada" : "Gasto"}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="py-2">
        <div className="flex flex-wrap justify-between items-center gap-2">
          <p className={`text-2xl font-bold ${typeColor}`}>
            R$ {transaction.amount.toFixed(2)}
          </p>

          <div className="flex items-center gap-1">
            <Tag className="h-4 w-4 text-muted-foreground" />
            <p className="text-sm text-muted-foreground uppercase">
              {transaction.category}
            </p>
          </div>
        </div>
      </CardContent>

      <CardFooter className="pt-0 pb-3 justify-end">
        <div className="flex items-center gap-1 text-xs text-muted-foreground">
          <Calendar className="h-3 w-3" />
          <span>{new Date(transaction.date).toLocaleDateString()}</span>
        </div>
      </CardFooter>
    </Card>
  );
}
