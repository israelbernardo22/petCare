const router = require('express').Router();
const controller = require('../controllers/pet.controller');

router.post('/', controller.create);
router.get('/user/:userId', controller.list);
router.get('/:id', controller.getById);      
router.put('/:id', controller.update);        
router.delete('/:id', controller.remove);

module.exports = router;