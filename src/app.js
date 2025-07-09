const express = require('express');
const bodyParser = require('body-parser');
const productRoutes = require('./rotas/produtoRota');
const categoryRoutes = require('./rotas/categoriaRota');
const { swaggerUi, swaggerSpec } = require('../swagger');

const app = express();
app.use(bodyParser.json());
app.use('/produtos', productRoutes);
app.use('/categorias', categoryRoutes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

module.exports = app;