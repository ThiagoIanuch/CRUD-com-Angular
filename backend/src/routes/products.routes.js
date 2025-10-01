const router = require('express').Router();

const productsControllers = require('../controllers/products.controllers');

router.post('/add', productsControllers.add);
router.get('/get', productsControllers.get);
router.put('/update/:id', productsControllers.update);
router.delete('/delete/:id', productsControllers.delete);

module.exports = router;