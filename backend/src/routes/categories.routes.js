const router = require('express').Router();

const categoriesControllers = require('../controllers/categories.controllers');

router.get('/get', categoriesControllers.get);

module.exports = router;