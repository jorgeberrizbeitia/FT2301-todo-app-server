const router = require("express").Router();

router.get("/", (req, res, next) => {
  res.json("All good in here");
});

const todoRoutes = require("./todo.routes.js")
router.use("/todo", todoRoutes)

const authRoutes = require("./auth.routes.js")
router.use("/auth", authRoutes)


module.exports = router;
