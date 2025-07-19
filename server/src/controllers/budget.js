const { Router } = require("express");
const { isUser } = require("../middlewares/guards");
const { parseError } = require("../util");
const {
  getBudgets,
  getSingleBudget,
  createNewBudget,
  createNewCard,
  removeCard,
  getMembers,
  addNewMember,
  removeMember,
  addIncome,
} = require("../services/budget");

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

budgetRouter.post("/singleBudget", async (req, res) => {
  try {
    const budget = await getSingleBudget(req.body.budgetId);
    res.json(budget);
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

budgetRouter.post("/cards/addNewCard", async (req, res) => {
  try {
    const { cardName, budgetId } = req.body;
    const result = await createNewCard(cardName, budgetId, req.user.email);
    res.json(result);
  } catch (err) {
    const parsed = parseError(err);
    res.status(403).json({ code: 403, message: parsed.errors });
  }
});

budgetRouter.post("/cards/removeCard", async (req, res) => {
  try {
    const { cardDetails, budgetId } = req.body;
    const result = await removeCard(cardDetails, budgetId);
    res.json(result);
  } catch (err) {
    const parsed = parseError(err);
    res.status(403).json({ code: 403, message: parsed.errors });
  }
});

budgetRouter.post("/members/getMembers", async (req, res) => {
  try {
    const result = await getMembers(req.body.members);
    res.json(result);
  } catch (err) {
    const parsed = parseError(err);
    res.status(403).json({ code: 403, message: parsed.errors });
  }
});

budgetRouter.post("/members/addNewMember", async (req, res) => {
  try {
    const { memberEmail, budgetId } = req.body;
    const result = await addNewMember(memberEmail, budgetId);
    res.json(result);
  } catch (err) {
    const parsed = parseError(err);
    res.status(403).json({ code: 403, message: parsed.errors });
  }
});

budgetRouter.post("/members/removeMember", async (req, res) => {
  try {
    const { memberId, budgetId } = req.body;
    const result = await removeMember(memberId, budgetId);
    res.json(result);
  } catch (err) {
    const parsed = parseError(err);
    res.status(403).json({ code: 403, message: parsed.errors });
  }
});

budgetRouter.post("/addIncome", async (req, res) => {
  try {
    const { periodId, incomeToAdd } = req.body;
    const result = await addIncome(periodId, incomeToAdd);
    res.json(result);
  } catch (err) {
    const parsed = parseError(err);
    res.status(403).json({ code: 403, message: parsed.errors });
  }
});

module.exports = { budgetRouter };
