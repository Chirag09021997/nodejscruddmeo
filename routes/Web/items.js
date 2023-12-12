var express = require("express");
var router = express.Router();
var itemController = require("../../controllers/Web/items.controller");

router.get("/getData", itemController.getData);
router.get("/create", itemController.create);
router.get("/:id/edit", itemController.edit);
router.route("/").get(itemController.get).post(itemController.store);
router
  .route("/:id")
  .get(itemController.show)
  .patch(itemController.update)
  .delete(itemController.delete);
module.exports = router;
