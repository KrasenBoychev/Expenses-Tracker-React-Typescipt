export default function About() {
  return (
    <div className="mx-auto w-[647px]">
      <p className="flex flex-col gap-5 p-10 bg-blue-900 rounded text-justify text-[17px]">
        <span>
          Expenses Tracker is an application that allows users to create one or
          more budgets, plan their expenses and track how much money they are
          going to save. Users can add income and actual expenses which changes
          automatically the money they are planning to save. Also, the
          application is great for families as one budget can be shared between
          its members. Everyone can add their income and expenses and can change
          the planned expenses.
        </span>
        <span>
          There is an option to complete the period that has been started and a
          new period will automatically start from the day after - this allows
          users to plan their expenses in an yearly, monthly, weekly or on their
          own choice basis.
        </span>
      </p>
    </div>
  );
}
