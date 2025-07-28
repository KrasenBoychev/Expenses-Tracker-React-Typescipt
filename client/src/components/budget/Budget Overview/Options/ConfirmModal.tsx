import toast from "react-hot-toast";
import { completePeriod } from "../../../../api/expenses-api";
import type {
  BudgetInterface,
  PeriodInterface,
} from "../../../../interfaces/budget";

interface ConfirmModalProps {
  setOpenModal: Function;
  selectedPeriod: PeriodInterface | undefined;
  setSelectedPeriod: Function;
  setPeriods: Function;
  budget: BudgetInterface | null;
}
export default function ConfirmModal({
  setOpenModal,
  selectedPeriod,
  setSelectedPeriod,
  setPeriods,
  budget,
}: ConfirmModalProps) {
  const completePeriodHandler = async () => {
    try {
      const newPeriod = await completePeriod(selectedPeriod!._id, budget!._id);
      setPeriods((periods: PeriodInterface[]) => {
        const findPeriod = periods.find(
          (period) => period._id == selectedPeriod!._id
        );
        findPeriod!.endDate = new Date().toString();

        periods.unshift(newPeriod);
        return periods;
      });

      setSelectedPeriod(newPeriod);
      setOpenModal(false);
    } catch (e: unknown) {
      if (e instanceof Error) {
        return toast.error(e.message);
      }
    }
  };
  return (
    <>
      <div
        className="hs-overlay size-full fixed top-0 start-0 z-80 overflow-x-hidden overflow-y-auto"
        data-testid="confirm-modal-container"
      >
        <div className="mt-12 opacity-100 duration-500 mt-0 opacity-0 ease-out transition-all sm:max-w-lg sm:w-full m-3 sm:mx-auto">
          <div className="relative flex flex-col bg-white shadow-lg rounded-xl dark:bg-neutral-900">
            <div className="absolute top-2 end-2">
              <button
                type="button"
                className="size-8 inline-flex justify-center items-center gap-x-2 rounded-full border border-transparent bg-gray-100 text-gray-800 hover:bg-gray-200 focus:outline-hidden focus:bg-gray-200 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-700 dark:hover:bg-neutral-600 dark:text-neutral-400 dark:focus:bg-neutral-600"
                onClick={() => setOpenModal(false)}
              >
                <span className="sr-only">Close</span>
                <svg
                  className="shrink-0 size-4"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M18 6 6 18" />
                  <path d="m6 6 12 12" />
                </svg>
              </button>
            </div>

            <div className="p-4 sm:p-14 text-center overflow-y-auto">
              <h3
                id="hs-cookies-label"
                className="mb-5 text-2xl font-bold text-gray-800 dark:text-neutral-200"
              >
                Are you sure you want to complete that period?
              </h3>
            </div>

            <div className="flex items-center">
              <button
                type="button"
                className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-es-xl border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-hidden focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none dark:bg-white/10 dark:hover:bg-white/20 dark:text-white dark:hover:text-white dark:focus:text-white"
                onClick={completePeriodHandler}
              >
                Complete Period
              </button>
              <button
                type="button"
                className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-ee-xl border border-transparent bg-gray-100 text-gray-800 hover:bg-gray-200 focus:outline-hidden focus:bg-gray-200 disabled:opacity-50 disabled:pointer-events-none"
                onClick={() => setOpenModal(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
