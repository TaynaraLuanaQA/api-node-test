/**
 * @swagger
 * tags:
 *   - name: Usuarios
 *     description: Operações de autenticação e registro de usuários
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Usuario:
 *       type: object
 *       required:
 *         - email
 *         - senha
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         email:
 *           type: string
 *           format: email
 *           example: usuario@exemplo.com
 *         senha:
 *           type: string
 *           example: "senha123"
 *     LoginResponse:
 *       type: object
 *       properties:
 *         token:
 *           type: string
 *           example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 */

/**
 * @swagger
 * /usuarios/registrar:
 *   post:
 *     summary: Registra um novo usuário
 *     tags:
 *       - Usuarios
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Usuario'
 *     responses:
 *       201:
 *         description: Usuário registrado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Usuario'
 *       400:
 *         description: Dados obrigatórios faltando
 */

/**
 * @swagger
 * /usuarios/login:
 *   post:
 *     summary: Realiza o login de um usuário
 *     tags:
 *       - Usuarios
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Usuario'
 *     responses:
 *       200:
 *         description: Login bem-sucedido com token JWT
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/LoginResponse'
 *       401:
 *         description: Credenciais inválidas
 */


const express = require('express');
const router = express.Router();
const usuarioController = require('../controlador/usuarioController');

router.post('/registrar', usuarioController.registrar);
router.post('/login', usuarioController.login);

module.exports = router;
