const express = require("express");
const server = express();
const cors = require("cors");

server.use(express.json());

server.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  next();
});
server.use(cors());

const clientes = [];
let contadorIdClientes = 1;

const condutores = [];
let contadorIdCondutores = 1;

const deslocamentos = [];
let contadorIdDeslocamentos = 1;

const veiculos = [];
let contadorIdVeiculos = 1;

// Rotas para a entidade "Cliente"
server.get("/api/v1/Cliente/:id", (req, res) => {
  const { id } = req.params;

  const clienteEncontrado = clientes.find(
    (cliente) => cliente.id === parseInt(id)
  );

  if (!clienteEncontrado) {
    return res.status(404).json({ message: "Cliente não encontrado" });
  }

  return res.json(clienteEncontrado);
});

server.get("/api/v1/Cliente", (req, res) => {
  return res.json(clientes);
});

server.post("/api/v1/Cliente", (req, res) => {
  const {
    numeroDocumento,
    tipoDocumento,
    nome,
    logradouro,
    numero,
    bairro,
    cidade,
    uf,
  } = req.body;
  const novoCliente = {
    id: contadorIdClientes,
    numeroDocumento,
    tipoDocumento,
    nome,
    logradouro,
    numero,
    bairro,
    cidade,
    uf,
  };
  clientes.push(novoCliente);
  contadorIdClientes++;

  return res.json(novoCliente);
});

server.put("/api/v1/Cliente/:id", (req, res) => {
  const { id } = req.params;
  const {
    numeroDocumento,
    tipoDocumento,
    nome,
    logradouro,
    numero,
    bairro,
    cidade,
    uf,
  } = req.body;

  const clienteEncontrado = clientes.find(
    (cliente) => cliente.id === parseInt(id)
  );

  if (!clienteEncontrado) {
    return res.status(404).json({ message: "Cliente não encontrado" });
  }

  clienteEncontrado.numeroDocumento = numeroDocumento;
  clienteEncontrado.tipoDocumento = tipoDocumento;
  clienteEncontrado.nome = nome;
  clienteEncontrado.logradouro = logradouro;
  clienteEncontrado.numero = numero;
  clienteEncontrado.bairro = bairro;
  clienteEncontrado.cidade = cidade;
  clienteEncontrado.uf = uf;

  return res.json(clienteEncontrado);
});

server.delete("/api/v1/Cliente/:id", (req, res) => {
  const { id } = req.params;

  const index = clientes.findIndex((cliente) => cliente.id === parseInt(id));

  if (index === -1) {
    return res.status(404).json({ message: "Cliente não encontrado" });
  }

  clientes.splice(index, 1);

  return res.json({ message: "O cliente foi deletado" });
});

// Rotas para a entidade "Condutor"
server.get("/api/v1/Condutor/:id", (req, res) => {
  const { id } = req.params;

  const condutorEncontrado = condutores.find(
    (condutor) => condutor.id === parseInt(id)
  );

  if (!condutorEncontrado) {
    return res.status(404).json({ message: "Condutor não encontrado" });
  }

  return res.json(condutorEncontrado);
});

server.get("/api/v1/Condutor", (req, res) => {
  return res.json(condutores);
});

server.post("/api/v1/Condutor", (req, res) => {
  const {
    nome,
    numeroHabilitacao,
    categoriaHabilitacao,
    vencimentoHabilitacao,
  } = req.body;

  const novoCondutor = {
    id: contadorIdCondutores,
    nome,
    numeroHabilitacao,
    categoriaHabilitacao,
    vencimentoHabilitacao,
  };
  condutores.push(novoCondutor);
  contadorIdCondutores++;

  return res.json(novoCondutor);
});

server.put("/api/v1/Condutor/:id", (req, res) => {
  const { id } = req.params;
  const {
    nome,
    numeroHabilitacao,
    categoriaHabilitacao,
    vencimentoHabilitacao,
  } = req.body;

  const condutorEncontrado = condutores.find(
    (condutor) => condutor.id === parseInt(id)
  );

  if (!condutorEncontrado) {
    return res.status(404).json({ message: "Condutor não encontrado" });
  }

  condutorEncontrado.nome = nome;
  condutorEncontrado.numeroHabilitacao = numeroHabilitacao;
  condutorEncontrado.categoriaHabilitacao = categoriaHabilitacao;
  condutorEncontrado.vencimentoHabilitacao = vencimentoHabilitacao;

  return res.json(condutorEncontrado);
});

server.delete("/api/v1/Condutor/:id", (req, res) => {
  const { id } = req.params;

  const index = condutores.findIndex(
    (condutor) => condutor.id === parseInt(id)
  );

  if (index === -1) {
    return res.status(404).json({ message: "Condutor não encontrado" });
  }

  condutores.splice(index, 1);

  return res.json({ message: "O condutor foi deletado" });
});

// Rotas para a entidade "Deslocamento"
server.get("/api/v1/Deslocamento/:id", (req, res) => {
  const { id } = req.params;

  const deslocamentoEncontrado = deslocamentos.find(
    (deslocamento) => deslocamento.id === parseInt(id)
  );

  if (!deslocamentoEncontrado) {
    return res.status(404).json({ message: "Deslocamento não encontrado" });
  }

  return res.json(deslocamentoEncontrado);
});

server.get("/api/v1/Deslocamento", (req, res) => {
  return res.json(deslocamentos);
});

server.post("/api/v1/Deslocamento/IniciarDeslocamento", (req, res) => {
  const {
    kmInicial,
    inicioDeslocamento,
    checkList,
    motivo,
    observacao,
    idCondutor,
    idVeiculo,
    idCliente,
  } = req.body;
  const novoDeslocamento = {
    //rever
    id: contadorIdDeslocamentos,
    kmInicial,
    inicioDeslocamento,
    checkList,
    motivo,
    observacao,
    idCondutor,
    idVeiculo,
    idCliente,
    status: "Em andamento",
  };
  deslocamentos.push(novoDeslocamento);
  contadorIdDeslocamentos++;

  return res.json(novoDeslocamento);
});

server.put("/api/v1/Deslocamento/:id/EncerrarDeslocamento", (req, res) => {
  const { id } = req.params;
  const { kmFinal, fimDeslocamento, observacao } = req.body;

  const deslocamentoEncontrado = deslocamentos.find(
    (deslocamento) => deslocamento.id === parseInt(id)
  );

  if (!deslocamentoEncontrado) {
    return res.status(404).json({ message: "Deslocamento não encontrado" });
  }

  deslocamentoEncontrado.kmFinal = kmFinal;
  deslocamentoEncontrado.fimDeslocamento = fimDeslocamento;
  deslocamentoEncontrado.observacao = observacao;

  return res.json(deslocamentoEncontrado);
});

server.delete("/api/v1/Deslocamento/:id", (req, res) => {
  const { id } = req.params;

  const index = deslocamentos.findIndex(
    (deslocamento) => deslocamento.id === parseInt(id)
  );

  if (index === -1) {
    return res.status(404).json({ message: "Deslocamento não encontrado" });
  }

  deslocamentos.splice(index, 1);

  return res.json({ message: "O deslocamento foi deletado" });
});

server.put("/api/v1/Deslocamento/:id/EncerrarDeslocamento", (req, res) => {
  const { id } = req.params;

  const deslocamentoEncontrado = deslocamentos.find(
    (deslocamento) => deslocamento.id === parseInt(id)
  );

  if (!deslocamentoEncontrado) {
    return res.status(404).json({ message: "Deslocamento não encontrado" });
  }

  deslocamentoEncontrado.status = "Encerrado";

  return res.json(deslocamentoEncontrado);
});

// Rotas para a entidade "Veiculo"
server.get("/api/v1/Veiculo/:id", (req, res) => {
  const { id } = req.params;

  const veiculoEncontrado = veiculos.find(
    (veiculo) => veiculo.id === parseInt(id)
  );

  if (!veiculoEncontrado) {
    return res.status(404).json({ message: "Veículo não encontrado" });
  }

  return res.json(veiculoEncontrado);
});

server.get("/api/v1/Veiculo", (req, res) => {
  return res.json(veiculos);
});

server.post("/api/v1/Veiculo", (req, res) => {
  const { placa, marcaModelo, anoFabricacao, kmAtual } = req.body;
  const novoVeiculo = {
    id: contadorIdVeiculos,
    placa,
    marcaModelo,
    anoFabricacao,
    kmAtual,
  };
  veiculos.push(novoVeiculo);
  contadorIdVeiculos++;

  return res.json(novoVeiculo);
});

server.put("/api/v1/Veiculo/:id", (req, res) => {
  const { id } = req.params;
  const { marcaModelo, anoFabricacao, kmAtual } = req.body;

  const veiculoEncontrado = veiculos.find(
    (veiculo) => veiculo.id === parseInt(id)
  );

  if (!veiculoEncontrado) {
    return res.status(404).json({ message: "Veículo não encontrado" });
  }

  veiculoEncontrado.marcaModelo = marcaModelo;
  veiculoEncontrado.anoFabricacao = anoFabricacao;
  veiculoEncontrado.kmAtual = kmAtual;

  return res.json(veiculoEncontrado);
});

server.delete("/api/v1/Veiculo/:id", (req, res) => {
  const { id } = req.params;

  const index = veiculos.findIndex((veiculo) => veiculo.id === parseInt(id));

  if (index === -1) {
    return res.status(404).json({ message: "Veículo não encontrado" });
  }

  veiculos.splice(index, 1);

  return res.json({ message: "O veículo foi deletado" });
});
const weatherForecasts = [
  {
    date: "2023-05-26T23:23:31.865Z",
    temperatureC: 0,
    temperatureF: 0,
    summary: "string",
  },
];

server.get("/api/v1/WeatherForecast", (req, res) => {
  return res.json(weatherForecasts);
});

server.listen(1111);
