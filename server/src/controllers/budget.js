const { Router } = require("express");
const { body, validationResult } = require("express-validator");
const { isGuest, isUser } = require("../middlewares/guards");
const { parseError } = require("../util");
const { createNewBudget, getBudgets } = require("../services/budget");

const budgetRouter = Router();

budgetRouter.post("/userBudgets", async (req, res) => {
  try {
    const allBudgets = await getBudgets(req.body.budgetsIds);
    res.json(allBudgets);
  } catch (err) {
    const parsed = parseError(err);
    res.status(403).json({ code: 403, message: parsed.errors });
  }
});

budgetRouter.post("/newBudget", isUser(), async (req, res) => {
  try {
    const data = {
      budgetName: req.body.budgetName,
      userId: req.user._id,
    };

    const newBudget = await createNewBudget(data);
    res.json(newBudget);
  } catch (err) {
    const parsed = parseError(err);
    res.status(403).json({ code: 403, message: parsed.errors });
  }
});

module.exports = { budgetRouter };
