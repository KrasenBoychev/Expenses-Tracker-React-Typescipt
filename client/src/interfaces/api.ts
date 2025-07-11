import type { FormErrorsInterface } from "./authentication";

export interface DataRequesterInterface extends FormErrorsInterface {
    budgetName?: string
    budgetsIds?: string[],
}
