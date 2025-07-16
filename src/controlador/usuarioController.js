const jwt = require('jsonwebtoken');
const usuarios = [];

exports.registrar = (req, res) => {
  const { email, senha } = req.body;
  if (!email || !senha) return res.status(400).send("Dados obrigatórios faltando");

  const novoUsuario = { id: usuarios.length + 1, email, senha };
  usuarios.push(novoUsuario);
  res.status(201).json(novoUsuario);
};

exports.login = (req, res) => {
  const { email, senha } = req.body;
  const usuario = usuarios.find(u => u.email === email && u.senha === senha);
  if (!usuario) return res.status(401).send("Credenciais inválidas");

  const token = jwt.sign({ id: usuario.id }, 'chaveSecreta', { expiresIn: '1h' });
  res.json({ token });
};
