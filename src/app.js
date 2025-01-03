const express = require('express');
const bodyParser = require('body-parser');
const productRoutes = require('./rotas/produtoRota');

const app = express();
app.use(bodyParser.json());
app.use('/products', productRoutes);

module.exports = app;