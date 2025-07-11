const { userRouter } = require("../controllers/user");
const { budgetRouter } = require("../controllers/budget");

function configRoutes(app) {
  app.use("/users", userRouter);
  app.use("/budget", budgetRouter);
}

module.exports = { configRoutes };
