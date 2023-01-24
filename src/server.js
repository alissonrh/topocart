const express = require('express');
const app = express();

app.use(express.json());

const productsMock = [
  {
    "id": 1,
    "name": "Martelo de Thor"
  },
  {
    "id": 2,
    "name": "Traje de encolhimento"
  },
  {
    "id": 3,
    "name": "Escudo do Capitão América"
  }
]

const getError = () => {
  return {
    type: 'PRODUCT_NOT_FOUND', message: 'Product not found'
  };
}


const getAll = () => {
  return productsMock
}

const getById = (id) => {
  const products = productsMock.find((product) => product.id === Number(id));
  if (!products) {
    return getError()
  }
  return {
    message: products
  };
}

const addNewProduct = (newProduct) => {
  const productLength = productsMock.length;
  productsMock.push({id: productLength + 1, ...newProduct});
  return productsMock
}

const editProduct = (id, name) => {
  const productToUpdate = productsMock.find((product) => product.id === Number(id));
  if (!productToUpdate) {
    return getError()
  }
  productToUpdate.name = name
  return {
    message: productToUpdate
  };
}

const deleteProduct = (id) => {
  const products = productsMock.filter((product) => product.id !== Number(id));
  if (!products) {
    return getError()
  }
  return {
    message: products
  };
}





app.get('/products', (_req, res) => {
  const message = getAll()
  res.status(200).json({ message })
})

app.get('/products/:id', (req, res) => {
  const { id } = req.params;
  const { type, message } = getById(id)
  if (type) return res.status(404).json({ message });
  res.status(200).json({ message });
})

app.post('/products', (req, res) => {
  const newProduct = req.body;

  const message = addNewProduct(newProduct)
  res.status(201).json(message);
})

app.put('/products/:id', (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  const { type, message } = editProduct(id, name);
  if (type) return res.status(404).json({ message });
  res.status(200).json({ message });
})

app.delete('/products/:id', (req, res) => {
  const { id } = req.params;

  const { type, message } = deleteProduct(id)
  if (type) return res.status(404).json({ message });
  res.status(200).json({ message })
})



app.listen(3004, () => {
  console.log(`Escutando na porta 3004`);
});
