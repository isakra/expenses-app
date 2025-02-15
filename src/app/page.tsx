"use client";

import { useState, useEffect } from "react";
import Wrapper from "@/components/Wrapper";
import MyInput from "@/components/MyInput";
import Item from "@/components/Item";
import { addExpense } from "@/services/add-expense";
import { deleteExpense } from "@/services/delete-expense";
import { fetchExpenses } from "@/services/get-all-expenses";

export default function MyExpenses() {
  const [expenses, setExpenses] = useState([]);
  const [name, setName] = useState("");
  const [cost, setCost] = useState("");
  const [totalCost, setTotalCost] = useState(0);

  useEffect(() => {
    async function loadExpenses() {
      const data = await fetchExpenses();
      setExpenses(data);
      setTotalCost(data.reduce((sum, exp) => sum + exp.cost, 0));
    }
    loadExpenses();
  }, []);

  const handleAddExpense = async () => {
    if (!name || !cost) return;
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
