const { Budget } = require("../models/Budget");
const { User } = require("../models/User");

async function getBudgets(budgetsIds) {
  return Budget.find({ _id: { $in: budgetsIds } }).lean();
}

async function createNewBudget(data) {
  const newBudget = new Budget({
    budgetName: data.budgetName,
    members: [data.userId],
  });

  await newBudget.save();

  await User.updateOne(
    { _id: data.userId },
    { $addToSet: { budgets: newBudget._id } }
  );

  return newBudget;
}

module.exports = {
  getBudgets,
  createNewBudget,
};
