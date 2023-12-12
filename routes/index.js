var express = require("express");
var router = express.Router();
const { authCheck, apiAuthCheck } = require("../middleware/auth.middleware");
const authController = require("../controllers/Web/auth.controller");
const apiAuthController = require("../controllers/Api/auth.controller");
/* GET home page. */
router.get("/", authCheck, async function (req, res, next) {
  const authUser = await req.authUser;
  if (authUser) {
    res.redirect("/dashboard");
  }
  res.render("index", { title: "Chirag" });
});

router.get("/dashboard", authCheck, function (req, res, next) {
  res.render("dashboard");
});

router.get("/logout", authCheck, authController.logout);

// authentication start
router.route("/login").get(authController.get).post(authController.login);
router.route("/api/login").post(apiAuthController.login);
// authentication end

// Web routes start
router.use("/users", authCheck, require("./Web/users"));
router.use("/items", authCheck, require("./Web/items"));
// Web routes end

// API routes start
router.use("/api/units", apiAuthCheck, require("./Api/units"));
// API routes end

router.get("*", function (req, res) {
  res.redirect("/");
});
module.exports = router;
