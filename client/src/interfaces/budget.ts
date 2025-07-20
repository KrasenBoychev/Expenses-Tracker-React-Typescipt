export interface BudgetInterface {
    _id: string,
    budgetName: string,
    allPeriods: string[],
    cards: CardInterface[],
    members: string[],
}

export interface PeriodInterface {
    _id: string,
    startDate: string,
    endDate: string | null,
    income: number,
    expenses: ExpenseInterface[],
    budgetId: string,
}

export interface ExpenseInterface {
    expenseType: string,
    plannedExpenses: number,
    actualExpenses: number,
}

export interface CardInterface {
    cardName: string,
    ownerEmail: string,
}

export interface MemberInterface {
    _id: string,
    email: string,
}

