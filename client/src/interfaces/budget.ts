export interface BudgetInterface {
    _id: string,
    budgetName: string,
    allPeriods: string[],
    cards: string[],
    members: string[],
}

export interface BudgetPropInterface {
    budget: BudgetInterface,
}