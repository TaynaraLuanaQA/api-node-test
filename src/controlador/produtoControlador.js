let products = [];
let idCounter = 1;

const requiredFields = [
  { name: 'name', validate: isNonEmptyString, message: "O campo 'name' é obrigatório e deve ser uma string não vazia." },
  { name: 'price', validate: isPositiveNumberString, message: "O campo 'price' é obrigatório e deve ser um número positivo." },
  { name: 'category', validate: isNonEmptyString, message: "O campo 'category' é obrigatório e deve ser uma string não vazia." },
  { name: 'quantity', validate: isNonNegativeIntegerString, message: "O campo 'quantity' é obrigatório e deve ser um inteiro não negativo." },
  { name: 'description', validate: isNonEmptyString, message: "O campo 'description' é obrigatório e deve ser uma string não vazia." },
  { name: 'manufacturer', validate: isNonEmptyString, message: "O campo 'manufacturer' é obrigatório e deve ser uma string não vazia." }
];

function isNonEmptyString(value) {
  return typeof value === 'string' && value.trim().length > 0;
}

function isPositiveNumberString(value) {
  const num = Number(value);
  return value !== undefined && value !== null && value !== '' && !isNaN(num) && num > 0;
}

function isNonNegativeIntegerString(value) {
  const num = Number(value);
  return value !== undefined && value !== null && value !== '' && Number.isInteger(num) && num >= 0;
}

function validateProductFields(body) {
  const errors = [];
  requiredFields.forEach(field => {
    if (!field.validate(body[field.name])) {
      errors.push(field.message);
    }
  });
  return errors.length ? errors : null;
}

function parseProductBody(body) {
  return {
    name: body.name,
    price: Number(body.price),
    category: body.category,
    quantity: Number(body.quantity),
    description: body.description,
    manufacturer: body.manufacturer
  };
}

exports.getAllProducts = (req, res) => res.json(products);

exports.createProduct = (req, res) => {
  const errors = validateProductFields(req.body);
  if (errors) return res.status(400).json({ errors });

  const product = {
    id: idCounter++,
    ...parseProductBody(req.body)
  };
  products.push(product);
  res.status(201).json(product);
};

exports.getProductById = (req, res) => {
  const product = products.find(p => p.id === parseInt(req.params.id));
  if (!product) return res.status(404).json({ error: 'Produto não encontrado.' });
  res.json(product);
};

exports.updateProduct = (req, res) => {
  const product = products.find(p => p.id === parseInt(req.params.id));
  if (!product) return res.status(404).json({ error: 'Produto não encontrado.' });

  // Para update, mescla o produto atual com o body e valida tudo
  const updatedData = { ...product, ...req.body };
  const errors = validateProductFields(updatedData);
  if (errors) return res.status(400).json({ errors });

  Object.assign(product, parseProductBody(req.body));
  res.json(product);
};

exports.deleteProduct = (req, res) => {
  const index = products.findIndex(p => p.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ error: 'Produto não encontrado.' });
  products.splice(index, 1);
  res.status(204).send();
};