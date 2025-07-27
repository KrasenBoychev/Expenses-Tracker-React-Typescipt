import { useState } from "react";
import type { PeriodInterface } from "../../../interfaces/budget";
import { addIncome } from "../../../api/expenses-api";
import toast from "react-hot-toast";

interface AddIncomeProps {
  currPeriod: PeriodInterface | undefined;
  setPeriods: Function;
  setUpdateTotalSavings: Function;
}

export default function AddIncome({
  currPeriod,
  setPeriods,
  setUpdateTotalSavings,
}: AddIncomeProps) {
  const [inputValue, setInputValue] = useState<number | string>("0");

  const addValueHandler = async () => {
    if (inputValue == "" || Number(inputValue) <= 0) {
      return;
    }

    const incomeToAdd = Number(inputValue);

    try {
      await addIncome(currPeriod!._id, incomeToAdd);
      setPeriods((periods: PeriodInterface[]) => {
        const findPeriod = periods.find(
          (period) => period._id == currPeriod!._id
        );
        findPeriod!.income += incomeToAdd;
        return periods;
      });

      setUpdateTotalSavings((value: boolean) => !value);
      setInputValue("");
      toast.success("Income successfully added!");
    } catch (e: unknown) {
      if (e instanceof Error) {
        return toast.error(e.message);
      }
    }
  };
  return (
    <div className="flex justify-between self-center gap-20 w-[70%] p-7 bg-white rounded">
      <input
        type="number"
        value={inputValue}
        onFocus={() => setInputValue("")}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <button
        className="w-[70px] bg-green-200 rounded"
        onClick={addValueHandler}
      >
        Add
      </button>
    </div>
  );
}
