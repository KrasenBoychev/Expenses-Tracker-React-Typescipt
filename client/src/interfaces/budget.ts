export interface BudgetInterface {
    _id: string,
    budgetName: string,
    allPeriods: string[],
    cards: string[],
    members: string[],
}

export interface PeriodInterface {
    _id: string,
    startDate: string,
    endDate: string | null,
    income: number,
    plannedExpenses: ExpenseInterface[],
    actualExpenses: ExpenseInterface[],
    budgetId: string,
}

export interface ExpenseInterface {
    expenseType: string,
    value: number,
}

export interface BudgetPropInterface {
    budget: BudgetInterface,
}

export interface BudgetMiddlewarePropInterface {
    budget: BudgetInterface | null,
}

export interface BudgetAndPeriodsPropsInterface {
    budget: BudgetInterface | null,
    periods: PeriodInterface[] | null
}

export interface StickySidebarPropsInterface {
    setPageToRender: Function,
    budget: BudgetInterface | null
    periods: PeriodInterface[] | null
}

export interface SelectedPeriodPropsInterface {
    selectedPeriod: PeriodInterface,
    periods: PeriodInterface[] | null,
}

export interface SelectedPeriodPropInterface {
    selectedPeriod: PeriodInterface,
}