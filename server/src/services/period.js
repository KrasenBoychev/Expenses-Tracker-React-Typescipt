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

module.exports = {
  getPeriods,
  createNewPeriod,
  createExpenseType,
  editExpense,
};
