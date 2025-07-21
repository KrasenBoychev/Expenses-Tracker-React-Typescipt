const { Budget } = require("../models/Budget");
const { Period } = require("../models/Period");
const { User } = require("../models/User");

async function getPeriods(periodsIds) {
  return Period.find({ _id: { $in: periodsIds } }).lean();
}

async function createNewPeriod(data) {
  const newPeriod = new Period({
    startDate: data.startDate,
    endDate: null,
    income: 0,
    expenses: [],
    budgetId: data.budgetId,
  });
  await newPeriod.save();

  await Budget.updateOne(
    { _id: data.budgetId },
    { $addToSet: { allPeriods: newPeriod._id } }
  );
  return newPeriod;
}

async function createExpenseType(periodId, newExpenseType, newExpenseValue) {
  return await Period.updateOne(
    { _id: periodId },
    {
      $addToSet: {
        expenses: {
          expenseType: newExpenseType,
          plannedExpenses: newExpenseValue,
          actualExpenses: 0,
        },
      },
    }
  );
}

async function editExpense(periodId, expenseType, newExpenseValue) {
  return await Period.updateOne(
    { _id: periodId, "expenses.expenseType": expenseType },
    {
      $set: { "expenses.$.plannedExpenses": newExpenseValue },
    }
  );
}

async function createActualExpense(periodId, expenseType, newExpenseValue) {
  return await Period.updateOne(
    { _id: periodId, "expenses.expenseType": expenseType },
    {
      $inc: { "expenses.$.actualExpenses": newExpenseValue },
    }
  );
}

async function matchExpensesValues(periodId, expensesTypes) {
  const getPeriod = await Period.findById(periodId);

  const newExpenses = [];
  getPeriod.expenses.forEach((expense) => {
    if (expensesTypes.includes(expense.expenseType)) {
      expense.plannedExpenses = expense.actualExpenses;
    }
    newExpenses.push(expense);
  });

  getPeriod.expenses.splice(0, getPeriod.expenses.length, ...newExpenses);

  await getPeriod.save();
  return getPeriod;
}

module.exports = {
  getPeriods,
  createNewPeriod,
  createExpenseType,
  editExpense,
  createActualExpense,
  matchExpensesValues,
};
