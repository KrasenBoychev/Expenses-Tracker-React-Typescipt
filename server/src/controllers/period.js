const { Router } = require("express");
const { isUser } = require("../middlewares/guards");
const { parseError } = require("../util");
const {
  getPeriods,
  getSinglePeriod,
  createNewPeriod,
  createExpenseType,
  editExpense,
  createActualExpense,
  matchExpensesValues,
  completePeriod,
} = require("../services/period");

const periodRouter = Router();

periodRouter.post("/budgetPeriods", async (req, res) => {
  try {
    const allBudgetPeriods = await getPeriods(req.body.periodsIds);
    res.json(allBudgetPeriods);
  } catch (err) {
    const parsed = parseError(err);
    res.status(403).json({ code: 403, message: parsed.errors });
  }
});

periodRouter.post("/singlePeriod", async (req, res) => {
  try {
    // const budget = await getSingleBudget(req.body.budgetId);
    // res.json(budget);
  } catch (err) {
    const parsed = parseError(err);
    res.status(403).json({ code: 403, message: parsed.errors });
  }
});

periodRouter.post("/newPeriod", isUser(), async (req, res) => {
  try {
    const data = {
      startDate: req.body.periodDate,
      budgetId: req.body.budgetId,
    };
    const newPeriod = await createNewPeriod(data);
    res.json(newPeriod);
  } catch (err) {
    const parsed = parseError(err);
    res.status(403).json({ code: 403, message: parsed.errors });
  }
});

periodRouter.post("/newExpenseType", isUser(), async (req, res) => {
  try {
    const { periodId, newExpenseType, newExpenseValue } = req.body;
    const result = await createExpenseType(
      periodId,
      newExpenseType,
      newExpenseValue
    );
    res.json(result);
  } catch (err) {
    const parsed = parseError(err);
    res.status(403).json({ code: 403, message: parsed.errors });
  }
});

periodRouter.post("/editExpense", isUser(), async (req, res) => {
  try {
    const { periodId, expenseType, newExpenseValue } = req.body;
    const result = await editExpense(periodId, expenseType, newExpenseValue);
    res.json(result);
  } catch (err) {
    const parsed = parseError(err);
    res.status(403).json({ code: 403, message: parsed.errors });
  }
});

periodRouter.post("/newActualExpense", isUser(), async (req, res) => {
  try {
    const { periodId, expenseType, newExpenseValue } = req.body;
    const result = await createActualExpense(
      periodId,
      expenseType,
      newExpenseValue
    );
    res.json(result);
  } catch (err) {
    const parsed = parseError(err);
    res.status(403).json({ code: 403, message: parsed.errors });
  }
});

periodRouter.post("/matchExpensesValues", isUser(), async (req, res) => {
  try {
    const { periodId, expensesTypes } = req.body;
    const result = await matchExpensesValues(periodId, expensesTypes);
    res.json(result);
  } catch (err) {
    const parsed = parseError(err);
    res.status(403).json({ code: 403, message: parsed.errors });
  }
});

periodRouter.post("/completePeriod", isUser(), async (req, res) => {
  try {
    const { periodId, budgetId } = req.body;

    const todayDate = new Date();
    const completedPeriod = await completePeriod(periodId, todayDate);

    const tomorrowDate = todayDate.setDate(todayDate.getDate() + 1);
    const data = {
      startDate: tomorrowDate,
      budgetId: budgetId,
    };
    const newPeriod = await createNewPeriod(data);

    res.json(newPeriod);
  } catch (err) {
    const parsed = parseError(err);
    res.status(403).json({ code: 403, message: parsed.errors });
  }
});

module.exports = { periodRouter };
