let products = [];
let idCounter = 1;

exports.getAllProducts = (req, res) => {
    res.json(products);
};

exports.createProduct = (req, res) => {
    const { name, price, category, quantity, description, manufacturer } = req.body;

    if (!name || !price || !category || !quantity) {
        return res.status(400).send('Missing fields');
    }

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
