let products = [];
let idCounter = 1;

exports.getAllProducts = (req, res) => {
    res.json(products);
};

exports.createProduct = (req, res) => {
    const product = { id: idCounter++, ...req.body };
    products.push(product);
    res.status(201).json(product);
};

exports.getProductById = (req, res) => {
    const product = products.find(p => p.id === parseInt(req.params.id));
    if (!product) return res.status(404).send('Product not found');
    res.json(product);
};

exports.updateProduct = (req, res) => {
    const product = products.find(p => p.id === parseInt(req.params.id));
    if (!product) return res.status(404).send('Product not found');
    Object.assign(product, req.body);
    res.json(product);
};

exports.deleteProduct = (req, res) => {
    const index = products.findIndex(p => p.id === parseInt(req.params.id));
    if (index === -1) return res.status(404).send('Product not found');
    products.splice(index, 1);
    res.status(204).send();
};