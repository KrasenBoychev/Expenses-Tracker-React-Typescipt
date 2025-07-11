const { Schema, model, Types } = require("mongoose");

const BudgetSchema = new Schema({
  budgetName: {
    type: String,
    required: true,
  },
  allPeriods: {
    type: [Types.ObjectId],
    ref: "Period",
  },
  cards: {
    type: Array,
    default: [],
  },
  members: {
    type: [Types.ObjectId],
    ref: "User",
    required: true,
  },
});
const Budget = model("budgets", BudgetSchema);
Budget.createIndexes();

module.exports = { Budget };
