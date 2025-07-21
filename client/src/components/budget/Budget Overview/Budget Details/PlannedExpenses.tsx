import { useState } from "react";
import type {
  ExpenseInterface,
  PeriodInterface,
} from "../../../../interfaces/budget";
import toast from "react-hot-toast";
import { addPlannedExpenseType } from "../../../../api/expenses-api";
import Modal from "./Modal";

interface PlannedExpensesProps {
  selectedPeriod: PeriodInterface | undefined;
  setPeriods: Function;
  expenseChangeDetection: boolean;
  setExpenseChangeDetection: Function;
  setUpdateTotalSavings: Function;
}

export default function PlannedExpenses({
  selectedPeriod,
  setPeriods,
  expenseChangeDetection,
  setExpenseChangeDetection,
  setUpdateTotalSavings,
}: PlannedExpensesProps) {
  const [newPlannedExpenseType, setNewPlannedExpenseType] =
    useState<string>("");
  const [newPlannedExpenseValue, setNewPlannedExpenseValue] = useState<
    number | string
  >("");
  const [editExpense, setEditExpense] = useState<ExpenseInterface | undefined>(
    undefined
  );
  const [openModal, setOpenModal] = useState<boolean>(false);

  const addExpenseTypeHandler = async () => {
    if (newPlannedExpenseType == "" || newPlannedExpenseValue == "") {
      return;
    }

    const existingExpenseType = selectedPeriod!.expenses.find(
      (expense) => expense.expenseType == newPlannedExpenseType
    );

    if (existingExpenseType) {
      toast.error("Expense Type already exists!");
      return;
    }

    try {
      await addPlannedExpenseType(
        selectedPeriod!._id,
        newPlannedExpenseType,
        Number(newPlannedExpenseValue)
      );
      setPeriods((periods: PeriodInterface[]) => {
        const findPeriod = periods.find((period) => period.endDate == null);
        findPeriod!.expenses.push({
          expenseType: newPlannedExpenseType,
          plannedExpenses: Number(newPlannedExpenseValue),
          actualExpenses: 0,
        });
        return periods;
      });
      setUpdateTotalSavings((prev: boolean) => !prev);
      setExpenseChangeDetection((prev: boolean) => !prev);
      setNewPlannedExpenseType("");
      setNewPlannedExpenseValue("");
    } catch (e: unknown) {
      if (e instanceof Error) {
        return toast.error(e.message);
      }
    }
  };

  const editExpenseClickHandler = (e: React.SyntheticEvent) => {
    const target = e.target as typeof e.target & {
      id: string;
    };
    console.log({ target });

    const expenseDetails = selectedPeriod!.expenses.find(
      (expense) => expense.expenseType == target.id
    );
    setEditExpense(expenseDetails);
    setOpenModal(true);
  };

  return (
    <>
      <div className="w-[100%] py-2">
        <ul className="px-2">
          {(expenseChangeDetection || !expenseChangeDetection) &&
            selectedPeriod!.expenses.map((expense) => (
              <li
                key={expense.expenseType}
                className="flex justify-between g-2 p-1"
              >
                <div className="flex justify-between w-[90%]">
                  <div>{expense.expenseType}</div>
                  <div>{expense.plannedExpenses.toFixed(2)}</div>
                </div>
                <div>
                  <i
                    className="fa-solid fa-pen-to-square hover:cursor-pointer"
                    id={expense.expenseType}
                    onClick={editExpenseClickHandler}
                  ></i>
                </div>
              </li>
            ))}
          {selectedPeriod!.endDate == null && (
            <li key={"newExpenseType"} className="flex justify-between mt-2">
              <input
                className="w-[45%] h-[25px] pl-1"
                type="text"
                placeholder="type"
                value={newPlannedExpenseType}
                onChange={(e) => setNewPlannedExpenseType(e.target.value)}
              />
              <input
                className="w-[45%] h-[25px] pl-1"
                type="number"
                placeholder="value"
                value={newPlannedExpenseValue}
                onChange={(e) => setNewPlannedExpenseValue(e.target.value)}
              />
              <button
                className="px-1.5 bg-green-300 rounded"
                onClick={addExpenseTypeHandler}
              >
                <i className="fa-solid fa-plus"></i>
              </button>
            </li>
          )}
        </ul>
      </div>
      {openModal && (
        <Modal
          setOpenModal={setOpenModal}
          editExpense={editExpense}
          periodId={selectedPeriod!._id}
          setPeriods={setPeriods}
          setUpdateTotalSavings={setUpdateTotalSavings}
        />
      )}
    </>
  );
}
