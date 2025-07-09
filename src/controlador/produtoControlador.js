let products = [];
let idCounter = 1;

const requiredFields = ['name', 'price', 'category', 'quantity'];

function validateProductFields(body) {
    const missing = requiredFields.filter(field => !body[field]);
    if (missing.length) {
        return `Campos obrigatórios ausentes: ${missing.join(', ')}`;
    }
    if (typeof body.price !== 'number' || body.price <= 0) {
        return 'O campo price deve ser um número positivo.';
    }
    if (!Number.isInteger(body.quantity) || body.quantity < 0) {
        return 'O campo quantity deve ser um inteiro não negativo.';
    }
    return null;
}

exports.getAllProducts = (req, res) => res.json(products);

exports.createProduct = (req, res) => {
    const error = validateProductFields(req.body);
    if (error) return res.status(400).json({ error });

    const { name, price, category, quantity, description = '', manufacturer = '' } = req.body;
    const product = {
        id: idCounter++,
        name,
        price,
        category,
        quantity,
        description,
        manufacturer
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

    Object.entries(req.body).forEach(([key, value]) => {
        if (key in product && value !== undefined) product[key] = value;
    });

    res.json(product);
};

exports.deleteProduct = (req, res) => {
    const index = products.findIndex(p => p.id === parseInt(req.params.id));
    if (index === -1) return res.status(404).json({ error: 'Produto não encontrado.' });
    products.splice(index, 1);
    res.status(204).send();
};