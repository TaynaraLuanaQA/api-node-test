const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).send("Token não fornecido ou inválido");
  }

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, 'chaveSecreta');
    req.usuario = decoded;
    next();
  } catch (err) {
    return res.status(403).send("Token expirado ou inválido");
  }
};
