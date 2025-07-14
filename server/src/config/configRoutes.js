const { userRouter } = require("../controllers/user");
const { budgetRouter } = require("../controllers/budget");
const { periodRouter } = require("../controllers/period");

function configRoutes(app) {
  app.use("/users", userRouter);
  app.use("/budget", budgetRouter);
  app.use("/period", periodRouter);
}

module.exports = { configRoutes };
