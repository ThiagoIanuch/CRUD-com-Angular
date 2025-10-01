const router = require('express').Router();

const productsControllers = require('../controllers/products.controllers');

router.get('/get', productsControllers.get);
router.delete('/delete/:id', productsControllers.delete);

module.exports = router;