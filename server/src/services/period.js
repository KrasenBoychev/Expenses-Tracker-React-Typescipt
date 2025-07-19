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
    plannedExpenses: [],
    actualExpenses: [],
    budgetId: data.budgetId,
  });
  await newPeriod.save();

  await Budget.updateOne(
    { _id: data.budgetId },
    { $addToSet: { allPeriods: newPeriod._id } }
  );
  return newPeriod;
}

async function createExpenseType(newExpenseType, periodId) {
  return await Period.updateOne(
    { _id: periodId },
    {
      $addToSet: { plannedExpenses: { expenseType: newExpenseType, value: 0 } },
    }
  );
}

module.exports = {
  getPeriods,
  createNewPeriod,
  createExpenseType,
};
