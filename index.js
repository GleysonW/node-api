const express = require('express');
const cors = require('cors');
const fs = require('fs');

const app = express();

app.use(cors());
app.use(express.json());

app.listen(5500, () => console.log('Rodando na porta 5500'));

// Função para carregar os dados de um arquivo JSON
function loadData(filePath) {
  try {
    const dataBuffer = fs.readFileSync(filePath);
    return JSON.parse(dataBuffer.toString());
  } catch (error) {
    return []; // Retorna array vazio se o arquivo não existir
  }
}

// Função para salvar os dados em um arquivo JSON
function saveData(filePath, data) {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2)); // Salva os dados formatados
}

// Carregar os dados iniciais dos arquivos JSON
let gastos = loadData('gastos.json');
let lucros = loadData('lucros.json');

// Rota para obter todos os dados (gastos e lucros)
app.route('/api/todos').get((req, res) => {
  res.json({ gastos, lucros });
});

// Rota para obter todos os gastos
app.route('/api/gastos').get((req, res) => {
  res.json({ gastos });
});

// Rota para obter um gasto específico por ID
app.route('/api/gastos/:id').get((req, res) => {
  const gastoId = req.params.id;
  const gasto = gastos.find(g => Number(g.id) === Number(gastoId));

  if (!gasto) {
    return res.status(404).json('Gasto não encontrado!');
  }

  res.json(gasto);
});

// Rota para adicionar um novo gasto
app.route('/api/gastos').post((req, res) => {
  const { tipo, valor, data } = req.body;

  if (!tipo || valor === undefined || !data) {
    return res.status(400).json('Todos os campos são obrigatórios: tipo, valor e data!');
  }

  const lastId = gastos.length > 0 ? gastos[gastos.length - 1].id : 0;

  const newGasto = {
    id: lastId + 1,
    tipo,
    valor,
    data
  };

  gastos.push(newGasto);
  saveData('gastos.json', gastos); // Salvar os gastos atualizados no arquivo

  res.status(201).json('Gasto salvo com sucesso!');
});

// Rota para atualizar um gasto existente
app.route('/api/gastos/:id').put((req, res) => {
  const gastoId = req.params.id;
  const gasto = gastos.find(g => Number(g.id) === Number(gastoId));

  if (!gasto) {
    return res.status(404).json('Gasto não encontrado!');
  }

  const { tipo, valor, data } = req.body;

  if (!tipo || valor === undefined || !data) {
    return res.status(400).json('Todos os campos são obrigatórios: tipo, valor e data!');
  }

  const updatedGasto = {
    ...gasto,
    tipo,
    valor,
    data
  };

  gastos = gastos.map(g => (Number(g.id) === Number(gastoId) ? updatedGasto : g));
  saveData('gastos.json', gastos); // Salvar os gastos atualizados no arquivo

  res.json('Gasto atualizado com sucesso!');
});

// Rota para deletar um gasto
app.route('/api/gastos/:id').delete((req, res) => {
  const gastoId = req.params.id;

  const gastoExists = gastos.some(g => Number(g.id) === Number(gastoId));
  if (!gastoExists) {
    return res.status(404).json('Gasto não encontrado!');
  }

  gastos = gastos.filter(g => Number(g.id) !== Number(gastoId));
  saveData('gastos.json', gastos); // Salvar os gastos atualizados no arquivo

  res.json('Gasto deletado com sucesso!');
});

// Rota para obter todos os lucros
app.route('/api/lucros').get((req, res) => {
  res.json({ lucros });
});

// Rota para obter um lucro específico por ID
app.route('/api/lucros/:id').get((req, res) => {
  const lucroId = req.params.id;
  const lucro = lucros.find(l => Number(l.id) === Number(lucroId));

  if (!lucro) {
    return res.status(404).json('Lucro não encontrado!');
  }

  res.json(lucro);
});

// Rota para adicionar um novo lucro
app.route('/api/lucros').post((req, res) => {
  const { tipo, valor, data } = req.body;

  if (!tipo || valor === undefined || !data) {
    return res.status(400).json('Todos os campos são obrigatórios: tipo, valor e data!');
  }

  const lastId = lucros.length > 0 ? lucros[lucros.length - 1].id : 0;

  const newLucro = {
    id: lastId + 1,
    tipo,
    valor,
    data
  };

  lucros.push(newLucro);
  saveData('lucros.json', lucros); // Salvar os lucros atualizados no arquivo

  res.status(201).json('Lucro salvo com sucesso!');
});

// Rota para atualizar um lucro existente
app.route('/api/lucros/:id').put((req, res) => {
  const lucroId = req.params.id;
  const lucro = lucros.find(l => Number(l.id) === Number(lucroId));

  if (!lucro) {
    return res.status(404).json('Lucro não encontrado!');
  }

  const { tipo, valor, data } = req.body;

  if (!tipo || valor === undefined || !data) {
    return res.status(400).json('Todos os campos são obrigatórios: tipo, valor e data!');
  }

  const updatedLucro = {
    ...lucro,
    tipo,
    valor,
    data
  };

  lucros = lucros.map(l => (Number(l.id) === Number(lucroId) ? updatedLucro : l));
  saveData('lucros.json', lucros); // Salvar os lucros atualizados no arquivo

  res.json('Lucro atualizado com sucesso!');
});

// Rota para deletar um lucro
app.route('/api/lucros/:id').delete((req, res) => {
  const lucroId = req.params.id;

  const lucroExists = lucros.some(l => Number(l.id) === Number(lucroId));
  if (!lucroExists) {
    return res.status(404).json('Lucro não encontrado!');
  }

  lucros = lucros.filter(l => Number(l.id) !== Number(lucroId));
  saveData('lucros.json', lucros); // Salvar os lucros atualizados no arquivo

  res.json('Lucro deletado com sucesso!');
});
