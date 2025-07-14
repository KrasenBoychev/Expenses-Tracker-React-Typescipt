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
