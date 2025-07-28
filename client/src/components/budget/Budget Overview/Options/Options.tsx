import { useState } from "react";
import type {
  BudgetInterface,
  PeriodInterface,
} from "../../../../interfaces/budget";
import ConfirmModal from "./ConfirmModal";

interface OptionsProps {
  budget: BudgetInterface | null;
  selectedPeriod: PeriodInterface | undefined;
  setSelectedPeriod: Function;
  setPeriods: Function;
  setBudgetDetails: Function;
}

export default function Options({
  budget,
  selectedPeriod,
  setSelectedPeriod,
  setPeriods,
  setBudgetDetails,
}: OptionsProps) {
  const [openModal, setOpenModal] = useState(false);

  const budgetDetailsHandler = () => {
    setBudgetDetails(true);
  };

  const confirmHandler = () => {
    setOpenModal(true);
  };
  return (
    <>
      <div className="flex justify-center gap-40 my-5">
        <button
          className="py-3 px-5 bg-gray-400 rounded"
          onClick={budgetDetailsHandler}
        >
          Details
        </button>
        {selectedPeriod!.endDate == null && (
          <button
            className="py-3 px-5 bg-red-500 rounded"
            onClick={confirmHandler}
          >
            Complete Period
          </button>
        )}
      </div>
      {openModal && (
        <ConfirmModal
          setOpenModal={setOpenModal}
          selectedPeriod={selectedPeriod}
          setSelectedPeriod={setSelectedPeriod}
          setPeriods={setPeriods}
          budget={budget}
        />
      )}
    </>
  );
}
