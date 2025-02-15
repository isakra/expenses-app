"use client";

import { useState, useEffect } from "react";
import Wrapper from "@/components/Wrapper";
import MyInput from "@/components/MyInput";
import Item from "@/components/Item";
import { addExpense } from "@/services/add-expense";
import { deleteExpense } from "@/services/delete-expence";
import { fetchExpenses } from "@/services/get-all-expenses";

// ✅ Define Expense type
interface Expense {
  id: string;
  name: string;
  cost: number;
}

export default function MyExpenses() {
  // ✅ Explicitly type useState
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [name, setName] = useState<string>("");
  const [cost, setCost] = useState<string>("");
  const [totalCost, setTotalCost] = useState<number>(0);

  useEffect(() => {
    async function loadExpenses() {
      const data: Expense[] = await fetchExpenses();
      setExpenses(data);
      setTotalCost(data.reduce((sum: number, exp: Expense) => sum + exp.cost, 0));
    }
    loadExpenses();
  }, []);

  const handleAddExpense = async () => {
    if (!name || !cost || isNaN(Number(cost))) return;
    const newExpense = await addExpense(name, Number(cost));
    if (newExpense) {
      setExpenses([...expenses, newExpense]);
      setTotalCost(totalCost + newExpense.cost);
      setName("");
      setCost("");
    }
  };

  return (
    <Wrapper>
      <h2 className="text-xl font-bold">My Expenses</h2>
      <MyInput label="Expense Name" type="text" value={name} onChange={(e) => setName(e.target.value)} />
      <MyInput label="Cost" type="number" value={cost} onChange={(e) => setCost(e.target.value)} />
      <button onClick={handleAddExpense} className="bg-blue-500 text-white px-4 py-2 rounded">
        Add Expense
      </button>
      {expenses.map((expense) => (
        <Item key={expense.id} item={expense} setItems={setExpenses} setSum={setTotalCost} />
      ))}
      <div className="font-bold">Total Cost: ${totalCost}</div>
    </Wrapper>
  );
}
