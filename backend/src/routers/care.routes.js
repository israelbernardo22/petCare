const router = require("express").Router();
const controller = require("../controllers/care.controller");

router.post("/", controller.create);
router.get("/:petId", controller.history);
router.get("/:petId/:id", controller.getById);
router.put("/:id", controller.update);
router.delete("/:id", controller.remove);

module.exports = router;
