import TransactionCard from "@/components/TransactionCard";

interface Transaction {
  _id: string;
  description: string;
  amount: number;
  type: "income" | "expense";
  category: string;
  date: string;
}

interface TransactionListProps {
  transactions: Transaction[];
}

export default function TransactionList({
  transactions,
}: TransactionListProps) {
  return (
    <section>
      <h2 className="text-xl font-semibold mb-2">Transações</h2>
      <ul className="space-y-2">
        {transactions.map((tx) => (
          <TransactionCard key={tx._id} transaction={tx} />
        ))}
      </ul>
    </section>
  );
}
