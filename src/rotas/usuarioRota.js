const express = require('express');
const router = express.Router();
const usuarioController = require('../controlador/usuarioController');

router.post('/registrar', usuarioController.registrar);
router.post('/login', usuarioController.login);

module.exports = router;
