const router = require("express").Router();
const controller = require("../controllers/user.controller");

router.post("/login", controller.login);
router.post("/register", controller.register);
router.get("/:id", controller.getProfile);
router.put("/:id", controller.updateProfile);

module.exports = router;
