const router = require('express').Router();

const productsControllers = require('../controllers/products.controllers');

router.get('/get', productsControllers.get);

module.exports = router;