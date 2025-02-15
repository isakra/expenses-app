import { deleteExpense } from "@/services/delete-expense";
import React from "react";

type Expense = {
  id: string;
  name: string;
  cost: number;
};

type Props = {
  item: Expense;
  setItems: React.Dispatch<React.SetStateAction<Expense[]>>;
  setSum: React.Dispatch<React.SetStateAction<number>>;
};

const Item = ({ item, setItems, setSum }: Props) => {
  const handleRemoveItem = async () => {
    const success = await deleteExpense(item.id);
    if (success) {
      setItems((prev) => prev.filter((i) => i.id !== item.id));
      setSum((prev) => prev - item.cost);
    }
  };

  return (
    <div className="flex justify-between items-center p-4 bg-[#a88ed2] rounded-lg shadow font-bold">
      <div>
        <p className="text-2xl">
          Name: <span className="font-light ml-2">{item.name}</span>
        </p>
        <p className="text-2xl font-bold">
          Cost: <span className="text-sm ml-2">{item.cost}kr.</span>
        </p>
      </div>
      <button onClick={handleRemoveItem} className="text-red-600">❌</button>
    </div>
  );
};

export default Item;
