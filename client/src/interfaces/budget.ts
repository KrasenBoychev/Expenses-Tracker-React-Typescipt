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

export interface BudgetMiddlewarePropInterface {
    budget: BudgetInterface | null,
}

export interface SetPageToRenderPropInterface {
    setPageToRender: Function,
}