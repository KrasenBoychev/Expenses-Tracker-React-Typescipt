const { Budget } = require("../models/Budget");
const { User } = require("../models/User");
const { Period } = require("../models/Period");

async function getBudgets(budgetsIds) {
  return Budget.find({ _id: { $in: budgetsIds } }).lean();
}

async function getSingleBudget(budgetId) {
  return Budget.find({ _id: budgetId }).lean();
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

async function createNewCard(cardName, budgetId, ownerEmail) {
  return await Budget.updateOne(
    { _id: budgetId },
    { $addToSet: { cards: { cardName, ownerEmail } } }
  );
}

async function removeCard(cardDetails, budgetId) {
  return await Budget.updateOne(
    { _id: budgetId },
    { $pull: { cards: cardDetails } }
  );
}

async function getMembers(members) {
  return await User.find({ _id: { $in: members } }).select("email");
}

async function addNewMember(memberEmail, budgetId) {
  const existingUser = await User.findOne({ email: memberEmail });

  if (existingUser) {
    await Budget.updateOne(
      { _id: budgetId },
      { $addToSet: { members: existingUser._id } }
    );

    existingUser.budgets.push(budgetId);
    existingUser.save();

    return { _id: existingUser._id, email: existingUser.email };
  } else {
    throw new Error(`${memberEmail} does not exists!`);
  }
}

async function removeMember(memberId, budgetId) {
  await Budget.updateOne({ _id: budgetId }, { $pull: { members: memberId } });
  return await User.updateOne(
    { _id: memberId },
    { $pull: { budgets: budgetId } }
  );
}

async function addIncome(periodId, incomeToAdd) {
  return await Period.updateOne(
    { _id: periodId },
    { $inc: { income: incomeToAdd.toFixed(2) } }
  );
}

module.exports = {
  getBudgets,
  getSingleBudget,
  createNewBudget,
  createNewCard,
  removeCard,
  getMembers,
  addNewMember,
  removeMember,
  addIncome,
};
