import type { PeriodInterface } from "../../../interfaces/budget";

interface SelectPeriodProps {
  selectedPeriod: PeriodInterface | undefined;
  setSelectedPeriod: Function;
  periods: PeriodInterface[] | null;
}

export default function SelectPeriod({
  selectedPeriod,
  setSelectedPeriod,
  periods,
}: SelectPeriodProps) {
  const renderDate = (date: string) => {
    return new Date(date).toLocaleDateString();
  };

  const showSelectedPeriod = (e: React.SyntheticEvent) => {
    const target = e.target as typeof e.target & {
      value: string;
    };
    const newSelectedPeriod = periods?.find(
      (period) => period._id == target.value
    );
    setSelectedPeriod(newSelectedPeriod);
  };
  return (
    <div>
      <select
        name="periods"
        id="periods"
        defaultValue={selectedPeriod!._id}
        className="w-[50%] text-black text-center appearance-none rounded cursor-pointer"
        onChange={showSelectedPeriod}
      >
        {periods?.map((period) => {
          if (period.endDate !== null) {
            return (
              <option key={period._id} value={period._id}>{`${renderDate(
                period.startDate
              )} - ${renderDate(period.endDate!)}`}</option>
            );
          } else {
            return (
              <option key={period._id} value={period._id}>{`${renderDate(
                selectedPeriod!.startDate
              )} - now`}</option>
            );
          }
        })}
      </select>
    </div>
  );
}
