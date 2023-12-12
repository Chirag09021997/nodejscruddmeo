var express = require("express");
var router = express.Router();
var unitController = require("../../controllers/Api/units.controller");
const { apiAuthCheck } = require("../../middleware/auth.middleware");
router.route("/").get(unitController.get).post(unitController.store);
router
  .route("/:id")
  .get(unitController.show)
  .patch(unitController.update)
  .delete(unitController.delete);

module.exports = router;
