const { Budget } = require("../models/Budget");
const { Period } = require("../models/Period");
const { User } = require("../models/User");

async function getPeriods(budgetsIds) {
  //   return Budget.find({ _id: { $in: budgetsIds } }).lean();
}

async function getSinglePeriod(budgetId) {
  //   return Budget.find({ _id: budgetId }).lean();
}

async function createNewPeriod(data) {
  //   const newBudget = new Budget({
  //     budgetName: data.budgetName,
  //     members: [data.userId],
  //   });
  //   await newBudget.save();
  //   await User.updateOne(
  //     { _id: data.userId },
  //     { $addToSet: { budgets: newBudget._id } }
  //   );
  //   return newBudget;
}

module.exports = {
  getPeriods,
  getSinglePeriod,
  createNewPeriod,
};
