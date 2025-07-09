let categoria = [];
let idCounter = 1;

exports.consultarTodasCategorias = (req, res) => {
  res.json(categoria);
};

exports.cadastrarCategoria = (req, res) => {
  const { nome, descricao } = req.body;

  if (!nome || !descricao) {
    return res.status(400).send('Campos obrigatórios ausentes');
  }

  const novaCategoria = {
    id: idCounter++,
    nome,
    descricao
  };

  categoria.push(novaCategoria);
  res.status(201).json(novaCategoria);
};

exports.consultarCategoriaPorId = (req, res) => {
  const categoriaEncontrada = categoria.find(c => c.id === parseInt(req.params.id));
  if (!categoriaEncontrada) return res.status(404).send('Categoria não encontrada');
  res.json(categoriaEncontrada);
};

exports.atualizarCategoria = (req, res) => {
  const categoriaEncontrada = categoria.find(c => c.id === parseInt(req.params.id));
  if (!categoriaEncontrada) return res.status(404).send('Categoria não encontrada');

  Object.assign(categoriaEncontrada, req.body);

  res.json(categoriaEncontrada);
};

exports.deletarCategoria = (req, res) => {
  const index = categoria.findIndex(c => c.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).send('Categoria não encontrada');
  categoria.splice(index, 1);
  res.status(204).send();
};
