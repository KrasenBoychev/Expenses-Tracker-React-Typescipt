import type { SelectedPeriodPropsInterface } from "../../../interfaces/budget";

export default function SelectPeriod({
  selectedPeriod,
  periods,
}: SelectedPeriodPropsInterface) {
  const renderDate = (date: string) => {
    return new Date(date).toLocaleDateString();
  };
  return (
    <div>
      <select
        name="periods"
        id="periods"
        defaultValue={selectedPeriod._id}
        className="w-[30%] text-black text-center appearance-none rounded cursor-pointer"
      >
        <option value={selectedPeriod._id}>{`${renderDate(
          selectedPeriod.startDate
        )} - now`}</option>
        {periods?.map((period, index) => {
          if (index !== 0) {
            return (
              <option value={period._id}>{`${renderDate(
                period.startDate
              )} - ${renderDate(period.endDate!)}`}</option>
            );
          }
        })}
      </select>
    </div>
  );
}
