const express = require('express');

const app = express();

const productsRoutes = require('./routes/products.routes.js');
app.use('/api/products/', productsRoutes);

app.listen(8080, () => {
    console.log("Servidor iniciado na porta 8080");
})