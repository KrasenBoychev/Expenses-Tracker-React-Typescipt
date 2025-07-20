import type { CardInterface } from "../interfaces/budget.js";
import * as api from "./requester.js";

const host = api.settings.host;

export async function getAllBudgets(budgetsIds: string[]) {
  return await api.post(host + "/budget/userBudgets", { budgetsIds });
}

export async function getSingleBudget(budgetId: string) {
  return await api.post(host + "/budget/singleBudget", { budgetId });
}

export async function createNewBudget(budgetName: string) {
  return await api.post(host + "/budget/newBudget", { budgetName });
}

export async function createNewCard(cardName: string, budgetId: string) {
  return await api.post(host + "/budget/cards/addNewCard", { cardName, budgetId });
}

export async function removeCard(cardDetails: CardInterface, budgetId: string) {
  return await api.post(host + "/budget/cards/removeCard", { cardDetails, budgetId });
}

export async function getMembers(members: string[]) {
  return await api.post(host + "/budget/members/getMembers", { members });
}

export async function createNewMember(memberEmail: string, budgetId: string) {
  return await api.post(host + "/budget/members/addNewMember", { memberEmail, budgetId });
}

export async function removeMember(memberId: string, budgetId: string) {
  return await api.post(host + "/budget/members/removeMember", { memberId, budgetId });
}

export async function addIncome(periodId: string, incomeToAdd: number) {
  return await api.post(host + "/budget/addIncome", { periodId, incomeToAdd });
}

export async function getAllPeriods(periodsIds: string[]) {
  return await api.post(host + "/period/budgetPeriods", { periodsIds });
}

export async function getSinglePeriod(periodId: string) {
  return await api.post(host + "/period/singlePeriod", { periodId });
}

export async function createNewPeriod(periodDate: Date, budgetId: string) {
  return await api.post(host + "/period/newPeriod", { periodDate, budgetId });
}

export async function addPlannedExpenseType(periodId: string, newExpenseType: string, newExpenseValue: number) {
  return await api.post(host + "/period/newExpenseType", { periodId, newExpenseType, newExpenseValue });
}

export async function editPlannedExpense(periodId: string, expenseType: string, newExpenseValue: number) {
  return await api.post(host + "/period/editExpense", { periodId, expenseType, newExpenseValue });
}

export async function addActualExpense(periodId: string, expenseType: string, newExpenseValue: number) {
  return await api.post(host + "/period/newActualExpense", { periodId, expenseType, newExpenseValue });
}