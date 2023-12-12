var express = require("express");
var router = express.Router();
var userController = require("../../controllers/Web/users.controller");

router.get("/getData", userController.getData);
router.get("/create", userController.create);
router.get("/:id/edit", userController.edit);
// router.get("/", userControllers.get);
// router.post("/", userController.store);
// router.get("/:id", userController.show);
// router.patch("/:id", userController.update);
// router.delete("/:id", userController.delete);

router.route("/").get(userController.get).post(userController.store);
router
  .route("/:id")
  .get(userController.show)
  .patch(userController.update)
  .delete(userController.delete);
module.exports = router;
