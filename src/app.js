const express = require('express');
const bodyParser = require('body-parser');
const productRoutes = require('./rotas/produtoRota');
const { swaggerUi, swaggerSpec } = require('../swagger');

const app = express();
app.use(bodyParser.json());
app.use('/products', productRoutes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

module.exports = app;