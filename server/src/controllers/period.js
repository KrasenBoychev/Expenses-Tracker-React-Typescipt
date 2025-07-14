const { Router } = require("express");
const { isUser } = require("../middlewares/guards");
const { parseError } = require("../util");
const {
  getPeriods,
  getSinglePeriod,
  createNewPeriod,
} = require("../services/period");

const periodRouter = Router();

periodRouter.post("/budgetPeriods", async (req, res) => {
  try {
    // const allBudgets = await getBudgets(req.body.budgetsIds);
    // res.json(allBudgets);
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
    // const data = {
    //   budgetName: req.body.budgetName,
    //   userId: req.user._id,
    // };
    // const newBudget = await createNewBudget(data);
    // res.json(newBudget);
  } catch (err) {
    const parsed = parseError(err);
    res.status(403).json({ code: 403, message: parsed.errors });
  }
});

module.exports = { periodRouter };
