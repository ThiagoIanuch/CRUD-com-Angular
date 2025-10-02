const express = require('express');
const app = express();
app.use(express.json());

const cors = require('cors');
app.use(cors());

const productsRoutes = require('./routes/products.routes.js');
const categoriesRoutes = require('./routes/categories.routes.js');
app.use('/api/products/', productsRoutes);
app.use('/api/categories', categoriesRoutes)

app.listen(8080, () => {
    console.log("Servidor iniciado na porta 8080");
})