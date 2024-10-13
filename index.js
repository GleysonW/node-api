const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

app.listen(5500, () => console.log('Rodando na porta 5500'));

let gastos = [
  {
    id: 1,
    tipo: "Alimentação",
    valor: 50.00,
    data: "2024-10-09"
  }
];

let lucros = [
  {
    id: 1,
    tipo: "Salário",
    valor: 2000.00,
    data: "2024-10-01"
  }
];

app.route('/api/todos').get((req, res) => {
  res.json({ gastos, lucros });
});

app.route('/api/gastos').get((req, res) => {
  res.json({ gastos });
});

app.route('/api/gastos/:id').get((req, res) => {
  const gastoId = req.params.id;
  const gasto = gastos.find(g => Number(g.id) === Number(gastoId));

  if (!gasto) {
    return res.status(404).json('Gasto não encontrado!');
  }

  res.json(gasto);
});

app.route('/api/gastos').post((req, res) => {
  const { tipo, valor, data } = req.body;

  if (!tipo || valor === undefined || !data) {
    return res.status(400).json('Todos os campos são obrigatórios: tipo, valor e data!'); // 400 Bad Request
  }

  const lastId = gastos.length > 0 ? gastos[gastos.length - 1].id : 0;

  const newGasto = {
    id: lastId + 1,
    tipo,
    valor,
    data
  };

  gastos.push(newGasto);
  res.status(201).json('Gasto salvo com sucesso!');
});

app.route('/api/gastos/:id').put((req, res) => {
  const gastoId = req.params.id;
  const gasto = gastos.find(g => Number(g.id) === Number(gastoId));

  if (!gasto) {
    return res.status(404).json('Gasto não encontrado!');
  }

  const { tipo, valor, data } = req.body;

  if (!tipo || valor === undefined || !data) {
    return res.status(400).json('Todos os campos são obrigatórios: tipo, valor e data!'); // 400 Bad Request
  }

  const updatedGasto = {
    ...gasto,
    tipo,
    valor,
    data
  };

  gastos = gastos.map(g => (Number(g.id) === Number(gastoId) ? updatedGasto : g));

  res.json("Gasto atualizado com sucesso!");
});

app.route('/api/gastos/:id').delete((req, res) => {
  const gastoId = req.params.id;

  const gastoExists = gastos.some(g => Number(g.id) === Number(gastoId));
  if (!gastoExists) {
    return res.status(404).json('Gasto não encontrado!');
  }

  gastos = gastos.filter(g => Number(g.id) !== Number(gastoId));

  res.json('Gasto deletado com sucesso!');
});

app.route('/api/lucros').get((req, res) => {
  res.json({ lucros });
});

app.route('/api/lucros/:id').get((req, res) => {
  const lucroId = req.params.id;
  const lucro = lucros.find(l => Number(l.id) === Number(lucroId));

  if (!lucro) {
    return res.status(404).json('Lucro não encontrado!');
  }

  res.json(lucro);
});

app.route('/api/lucros').post((req, res) => {
  const { tipo, valor, data } = req.body;

  if (!tipo || valor === undefined || !data) {
    return res.status(400).json('Todos os campos são obrigatórios: tipo, valor e data!'); // 400 Bad Request
  }

  const lastId = lucros.length > 0 ? lucros[lucros.length - 1].id : 0;

  const newLucro = {
    id: lastId + 1,
    tipo,
    valor,
    data
  };

  lucros.push(newLucro);
  res.status(201).json('Lucro salvo com sucesso!');
});

app.route('/api/lucros/:id').put((req, res) => {
  const lucroId = req.params.id;
  const lucro = lucros.find(l => Number(l.id) === Number(lucroId));

  if (!lucro) {
    return res.status(404).json('Lucro não encontrado!');
  }

  const { tipo, valor, data } = req.body;

  if (!tipo || valor === undefined || !data) {
    return res.status(400).json('Todos os campos são obrigatórios: tipo, valor e data!'); // 400 Bad Request
  }

  const updatedLucro = {
    ...lucro,
    tipo,
    valor,
    data
  };

  lucros = lucros.map(l => (Number(l.id) === Number(lucroId) ? updatedLucro : l));

  res.json("Lucro atualizado com sucesso!");
});

app.route('/api/lucros/:id').delete((req, res) => {
  const lucroId = req.params.id;

  const lucroExists = lucros.some(l => Number(l.id) === Number(lucroId));
  if (!lucroExists) {
    return res.status(404).json('Lucro não encontrado!');
  }

  lucros = lucros.filter(l => Number(l.id) !== Number(lucroId));

  res.json('Lucro deletado com sucesso!');
});