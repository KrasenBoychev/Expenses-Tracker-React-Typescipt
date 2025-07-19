import type { FormErrorsInterface } from "./authentication";
import type { CardInterface } from "./budget";

export interface DataRequesterInterface extends FormErrorsInterface {
    budgetName?: string
    budgetsIds?: string[],
    budgetId?: string,
    cardName?: string,
    cardDetails?: CardInterface,
    members?: string[],
    memberEmail?: string,
    memberId?: string,
    periodDate?: Date,
    periodsIds?: string[],
    periodId?: string,
    incomeToAdd?: number,
    newExpenseType?: string,
}
