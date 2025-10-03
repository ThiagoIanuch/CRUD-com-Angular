const router = require('express').Router();

const categoriesControllers = require('../controllers/categories.controllers');

router.post('/add', categoriesControllers.add);
router.get('/get', categoriesControllers.get);
router.delete('/delete/:id', categoriesControllers.delete);

module.exports = router;