"use client";
import { useState, FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface TransactionFormProps {
  onAdd: (transaction: {
    _id?: string;
    description: string;
    amount: number;
    type: "income" | "expense";
    category: string;
    date: string;
  }) => void;
}

export default function TransactionForm({ onAdd }: TransactionFormProps) {
  const [form, setForm] = useState({
    description: "",
    amount: "",
    type: "expense",
    category: "",
    date: "",
  });

  function handleAmountChange(e: React.ChangeEvent<HTMLInputElement>) {
    let value = e.target.value.replace(/[^\d]/g, "");
    if (!value) {
      setForm({ ...form, amount: "" });
      return;
    }
    const numberValue = parseInt(value, 10) / 100;
    const formatted = numberValue.toFixed(2);
    setForm({ ...form, amount: formatted });
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    try {
      const res = await fetch("/api/transactions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, amount: parseFloat(form.amount) }),
      });
      if (res.ok) {
        const newTrans = await res.json();
        onAdd(newTrans);
        setForm({
          description: "",
          amount: "",
          type: "expense",
          category: "",
          date: "",
        });
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mb-6 space-y-4">
      <Input
        placeholder="Descrição"
        value={form.description}
        onChange={(e) => setForm({ ...form, description: e.target.value })}
      />
      <Input
        type="text"
        placeholder="Valor"
        value={form.amount}
        onChange={handleAmountChange}
      />
      <select
        value={form.type}
        onChange={(e) => setForm({ ...form, type: e.target.value })}
        className="border p-2 rounded mr-5"
      >
        <option value="income">Entrada</option>
        <option value="expense">Gasto</option>
      </select>
      <select
        value={form.category}
        onChange={(e) => setForm({ ...form, category: e.target.value })}
        className="border p-2 rounded"
      >
        <option value="">Selecione a categoria</option>
        <option value="conta fixa">Conta Fixa</option>
        <option value="comida">Comida</option>
        <option value="entretenimento">Entretenimento</option>
        <option value="salario">Salário</option>
        <option value="outros">Outros</option>
      </select>
      <Input
        type="date"
        value={form.date}
        onChange={(e) => setForm({ ...form, date: e.target.value })}
      />
      <Button type="submit">Adicionar Transação</Button>
    </form>
  );
}
