import { useState } from "react";
import type { BudgetInterface } from "../../interfaces/budget";

interface BudgetCardsProps {
  budget: BudgetInterface | null;
}

export default function BudgetCards({ budget }: BudgetCardsProps) {
  const [newCard, setNewCard] = useState<string>("");

  const addNewCardHandler = () => {
    //TODO
  };
  return (
    <div className="flex flex-col w-full mt-10 ml-[150px] bg-gray-100 text-black">
      <h3 className="w-[100%] p-2 text-xl text-center border-b-1 border-black">
        All Cards
      </h3>
      <ul className="p-2">
        <li className="flex justify-between gap-2">
          <input
            type="text"
            className="w-[70%] h-7 rounded"
            value={newCard}
            onChange={(e) => setNewCard(e.target.value)}
          />
          <button
            className="mr-2 py-1 px-2 bg-green-300 rounded"
            onClick={addNewCardHandler}
          >
            add
          </button>
        </li>
        {budget?.cards.map((card, index) => (
          <li key={index}>{card}</li>
        ))}
      </ul>
    </div>
  );
}
