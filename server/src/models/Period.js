const { Schema, model, Types } = require("mongoose");

const PeriodSchema = new Schema({
  startDate: {
    type: Date,
    default: Date.now,
  },
  endDate: {
    type: Date,
  },
  income: {
    type: Number,
    default: 0,
  },
  expenses: {
    type: Array,
    default: [],
  },
  budgetId: {
    type: Types.ObjectId,
    ref: "Budget",
  },
});
const Period = model("periods", PeriodSchema);
Period.createIndexes();

module.exports = { Period };
