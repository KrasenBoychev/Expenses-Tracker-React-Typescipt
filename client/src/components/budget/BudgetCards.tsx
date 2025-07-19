import { useState } from "react";
import type { BudgetInterface, CardInterface } from "../../interfaces/budget";
import toast from "react-hot-toast";
import { createNewCard, removeCard } from "../../api/expenses-api";
import { useAuthContext } from "../../contexts/AuthContext";

interface BudgetCardsProps {
  budget: BudgetInterface | null;
  setBudget: Function;
}

export default function BudgetCards({ budget, setBudget }: BudgetCardsProps) {
  const [newCard, setNewCard] = useState<string>("");
  const [changeDetection, setChangeDetection] = useState(false);
  const { email } = useAuthContext();

  const addNewCardHandler = async () => {
    try {
      await createNewCard(newCard, budget!._id);
      setBudget((budget: BudgetInterface) => {
        budget.cards.push({ cardName: newCard, ownerEmail: email });
        return budget;
      });
      setNewCard("");
    } catch (e: unknown) {
      if (e instanceof Error) {
        return toast.error(e.message);
      }
    }
  };

  const removeCardHandler = async (e: React.SyntheticEvent) => {
    const target = e.target as typeof e.target & {
      id: string;
    };

    const cardDetails: CardInterface = JSON.parse(target.id);

    try {
      await removeCard(cardDetails, budget!._id);
      setBudget((budget: BudgetInterface) => {
        budget.cards = budget.cards.filter(
          (card) => card.cardName !== cardDetails.cardName
        );
        return budget;
      });
      setChangeDetection(!changeDetection);
    } catch (e: unknown) {
      if (e instanceof Error) {
        return toast.error(e.message);
      }
    }
  };
  return (
    <div className="flex flex-col w-full mt-10 ml-[150px] mx-auto p-2 bg-gray-100 text-black">
      <h3 className="w-[100%] p-3 text-xl text-center border-b-1 border-black">
        All Cards
      </h3>
      <ul className="flex flex-col gap-2 p-3">
        <li className="flex justify-between gap-2">
          <input
            type="text"
            className="w-[80%] h-7 rounded"
            value={newCard}
            onChange={(e) => setNewCard(e.target.value)}
          />
          <button
            className="w-[70px] py-1 px-2 bg-green-300 rounded"
            onClick={addNewCardHandler}
          >
            add
          </button>
        </li>
        {budget!.cards.length > 0 &&
          budget!.cards.map((card, index) => (
            <li
              key={index}
              className="flex justify-between gap-2 hover:opacity-50"
            >
              <span>{`${card.cardName} (${card.ownerEmail})`}</span>
              <button
                className="w-[70px] py-1 px-2 bg-red-300 rounded"
                id={JSON.stringify(card)}
                onClick={removeCardHandler}
              >
                remove
              </button>
            </li>
          ))}
      </ul>
    </div>
  );
}
