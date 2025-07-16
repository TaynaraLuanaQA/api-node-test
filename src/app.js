const express = require('express');
const bodyParser = require('body-parser');
const productRoutes = require('./rotas/produtoRota');
const categoryRoutes = require('./rotas/categoriaRota');
const usuarioRoutes = require('./rotas/usuarioRota');
const authMiddleware = require('./middleware/authMiddleware');
const { swaggerUi, swaggerSpec } = require('../swagger');

const app = express();
app.use(bodyParser.json());

// rotas públicas
app.use('/usuarios', usuarioRoutes);

// rotas protegidas
app.use('/produtos', authMiddleware, productRoutes);
app.use('/categorias', authMiddleware, categoryRoutes);

// documentação da API
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

module.exports = app;
