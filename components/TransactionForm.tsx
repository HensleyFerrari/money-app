"use client";
import { useState, FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

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
      <div className="space-y-2">
        <Label htmlFor="description">Descrição</Label>
        <Input
          id="description"
          placeholder="Descrição"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="amount">Valor</Label>
        <Input
          id="amount"
          type="text"
          placeholder="Valor"
          value={form.amount}
          onChange={handleAmountChange}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="type">Tipo</Label>
          <Select
            value={form.type}
            onValueChange={(value) =>
              setForm({ ...form, type: value as "income" | "expense" })
            }
          >
            <SelectTrigger id="type">
              <SelectValue placeholder="Selecione o tipo" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="income">Entrada</SelectItem>
              <SelectItem value="expense">Gasto</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="category">Categoria</Label>
          <Select
            value={form.category}
            onValueChange={(value) => setForm({ ...form, category: value })}
          >
            <SelectTrigger id="category">
              <SelectValue placeholder="Selecione a categoria" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="conta fixa">Conta Fixa</SelectItem>
              <SelectItem value="comida">Comida</SelectItem>
              <SelectItem value="entretenimento">Entretenimento</SelectItem>
              <SelectItem value="salario">Salário</SelectItem>
              <SelectItem value="outros">Outros</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="date">Data</Label>
        <Input
          id="date"
          type="date"
          value={form.date}
          onChange={(e) => setForm({ ...form, date: e.target.value })}
        />
      </div>

      <Button type="submit" className="w-full">
        Adicionar Transação
      </Button>
    </form>
  );
}
