const router = require('express').Router();
const controller = require('../controllers/care.controller');

router.post('/', controller.create);
router.get('/:petId', controller.history);

module.exports = router;