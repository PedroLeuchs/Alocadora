import "./App.css";
import { api } from "./api";
import { useState } from "react";
import axios from "axios";
import edit from "./assets/edit.png";
import delet from "./assets/delete.png";
import vizu from "./assets/vizualizar.png";

function App() {
  // CLIENTE
  const novoCliente = {
    id: 0,
    numeroDocumento: "",
    tipoDocumento: "",
    nome: "",
    logradouro: "",
    numero: "",
    bairro: "",
    cidade: "",
    uf: "",
  };
  const [view, setView] = useState(false);
  const [view2, setView2] = useState(false);

  const [clientes, setClientes] = useState([]);
  const [cliente, setCliente] = useState(novoCliente);

  async function getClienteById(id) {
    const url = `Cliente/${id}`;

    try {
      await api.get(url).then((response) => {
        console.log(response.data);
        setCliente(response.data);
      });
    } catch (error) {
      console.error("Erro ao buscar o cliente:", error);
    }
  }

  async function getClientes() {
    await api
      .get("Cliente")
      .then((res) => {
        console.log(res.data);
        setClientes(res.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  async function postCliente() {
    const url = "Cliente";

    try {
      await api.post(url, cliente);
      console.log("Cliente cadastrado com sucesso!");
      // Limpar os campos do formulário após o cadastro
      setCliente({
        numeroDocumento: "",
        tipoDocumento: "",
        nome: "",
        logradouro: "",
        numero: "",
        bairro: "",
        cidade: "",
        uf: "",
      });
      // Atualizar a lista de clientes após o cadastro
      getClientes();
    } catch (error) {
      console.error("Erro ao cadastrar o cliente:", error);
    }
  }

  async function editCliente(cliente) {
    const url = "Cliente/";
    await api.put(url + cliente.id, cliente).then((response) => {
      console.log(response.data);
      getClientes();
    });
  }

  async function deleteCliente(clienteId) {
    const url = `http://localhost:1111/api/v1/Cliente/${clienteId}`;

    try {
      await axios.delete(url);
      getClientes();
      console.log("Cliente excluído com sucesso!");
    } catch (error) {
      console.error("Erro ao excluir o cliente:", error);
    }
  }
  // CONDUTOR
  const novoCondutor = {
    nome: "",
    numeroHabilitacao: "",
    categoriaHabilitacao: "",
    vencimentoHabilitacao: "",
  };

  const [condutores, setCondutores] = useState([]);
  const [condutor, setCondutor] = useState({ novoCondutor });
  async function getCondutorById(id) {
    const url = `Condutor/${id}`;

    try {
      await api.get(url).then((response) => {
        console.log(response.data);
        setCondutor(response.data);
      });
    } catch (error) {
      console.error("Erro ao buscar o condutor:", error);
    }
  }

  async function getCondutor() {
    await api
      .get("Condutor")
      .then((res) => {
        console.log(res.data);
        setCondutores(res.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  async function postCondutor() {
    const url = "http://localhost:1111/api/v1/Condutor";

    try {
      await axios.post(url, condutor);
      console.log("Condutor cadastrado com sucesso!");
      // Limpar os campos do formulário após o cadastro
      setCondutor({
        nome: "",
        numeroHabilitacao: "",
        categoriaHabilitacao: "",
        vencimentoHabilitacao: "",
      });
      // Atualizar a lista de Condutores após o cadastro
      getCondutor();
    } catch (error) {
      console.error("Erro ao cadastrar o Condutor:", error);
    }
  }

  async function editCondutor(condutor) {
    const url = "Condutor/";
    await api.put(url + condutor.id, condutor).then((response) => {
      console.log(response.data);
      getCondutor();
    });
  }
  async function deleteCondutor(CondutorId) {
    const url = `Condutor/${CondutorId}`;

    try {
      await axios.delete(url);
      console.log("Condutor excluído com sucesso!");
      getCondutor();
    } catch (error) {
      console.error("Erro ao excluir o Condutor:", error);
    }
  }
  // DESLOCAMENTO

  const novoDeslocamento = {
    kmInicial: 0,
    inicioDeslocamento: "",
    checkList: "",
    motivo: "",
    observacao: "",
    idCondutor: 0,
    idVeiculo: 0,
    idCliente: 0,
  };

  const [deslocamentos, setDeslocamentos] = useState([]);
  const [deslocamento, setDeslocamento] = useState({ novoDeslocamento });
  async function getDeslocamentoById(DeslocamentoId) {
    const url = `http://localhost:1111/api/v1/Deslocamento/${DeslocamentoId}`;

    try {
      await api.get(url).then((response) => {
        console.log(response.data);
        setDeslocamento(response.data);
      });
    } catch (error) {
      console.error("Erro ao buscar o condutor:", error);
    }
  }

  async function getDeslocamentos() {
    await api
      .get("Deslocamento")
      .then((res) => {
        console.log(res.data);
        setDeslocamentos(res.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  async function postDeslocamento() {
    const url = "http://localhost:1111/api/v1/Deslocamento/IniciarDeslocamento";

    try {
      await api.post(url, deslocamento);
      console.log("Deslocamento cadastrado com sucesso!");
      // Limpar os campos do formulário após o cadastro
      setDeslocamento({
        kmInicial: 0,
        inicioDeslocamento: "",
        checkList: "",
        motivo: "",
        observacao: "",
        idCondutor: 0,
        idVeiculo: 0,
        idCliente: 0,
      });
      // Atualizar a lista de Deslocamentoes após o cadastro
      getDeslocamentos();
    } catch (error) {
      console.error("Erro ao cadastrar o Deslocamento:", error);
    }
  }

  async function editDeslocamento(deslocamento) {
    const EncerrarDeslocamento = {
      ...deslocamento,
      kmFinal: 0,
      fimDeslocamento: "",
      observacao: "",
    };
    const url = `http://localhost:1111/api/v1/Deslocamento/${deslocamento.id}/EncerrarDeslocamento/`;
    await api.put(url, deslocamento).then((response) => {
      console.log(response.data);
      getDeslocamentos();
    });
  }

  async function deleteDeslocamento(DeslocamentoId) {
    const url = `http://localhost:1111/api/v1/Deslocamento/${DeslocamentoId}`;

    try {
      await axios.delete(url);
      console.log("Deslocamento excluído com sucesso!");
    } catch (error) {
      console.error("Erro ao excluir o Deslocamento:", error);
    }
  }
  // VEICULO
  const novoVeiculo = {
    placa: "string",
    marcaModelo: "string",
    anoFabricacao: 0,
    kmAtual: 0,
  };

  const [veiculos, setVeiculos] = useState([]);
  const [veiculo, setVeiculo] = useState({ novoVeiculo });
  async function getVeiculoById(VeiculoId) {
    const url = `Veiculo/${VeiculoId}`;

    try {
      await api.get(url).then((response) => {
        console.log(response.data);
        setVeiculo(response.data);
      });
    } catch (error) {
      console.error("Erro ao buscar o veiculo:", error);
    }
  }

  async function getVeiculos() {
    await api
      .get("/Veiculo")
      .then((res) => {
        console.log(res.data);
        setVeiculos(res.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  async function postVeiculo() {
    const url = "http://localhost:1111/api/v1/Veiculo";

    try {
      await axios.post(url, veiculo);
      console.log("Veiculo cadastrado com sucesso!");
      // Limpar os campos do formulário após o cadastro
      setVeiculo({
        placa: "string",
        marcaModelo: "string",
        anoFabricacao: 0,
        kmAtual: 0,
      });
      // Atualizar a lista de Veiculo após o cadastro
      getVeiculos();
    } catch (error) {
      console.error("Erro ao cadastrar o Veiculo:", error);
    }
  }

  async function editVeiculo(veiculo) {
    const url = "Veiculo/";
    await api.put(url + veiculo.id, veiculo).then((response) => {
      console.log(response.data);
      getCondutor();
    });
  }

  async function deleteVeiculo(VeiculoId) {
    const url = `http://localhost:1111/api/v1/Veiculo/${VeiculoId}`;

    try {
      await axios.delete(url);
      console.log("Veiculo excluído com sucesso!");
    } catch (error) {
      console.error("Erro ao excluir o Veiculo:", error);
    }
  }
  const [previsao, setPrevisao] = useState();

  async function getPrevisao() {
    await api
      .get("/WeatherForecast")
      .then((res) => {
        console.log(res.data);
        setPrevisao(res.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  const [displayClientes, setDisplayClientes] = useState(false);
  const [displayCondutor, setDisplayCondutor] = useState(false);
  const [displayDeslocamento, setDisplayDeslocamento] = useState(false);
  const [displayVeiculo, setDisplayVeiculo] = useState(false);
  const [displayPrevisao, setDisplayPrevisao] = useState(false);

  const toggleClientes = () => {
    setDisplayClientes(true);
    setDisplayCondutor(false);
    setDisplayDeslocamento(false);
    setDisplayVeiculo(false);
    setDisplayPrevisao(false);
    getClientes();
  };

  const toggleCondutor = () => {
    setDisplayClientes(false);
    setDisplayCondutor(true);
    setDisplayDeslocamento(false);
    setDisplayVeiculo(false);
    setDisplayPrevisao(false);
    getCondutor();
  };

  const toggleDeslocamento = () => {
    setDisplayClientes(false);
    setDisplayCondutor(false);
    setDisplayDeslocamento(true);
    setDisplayVeiculo(false);
    setDisplayPrevisao(false);
    getDeslocamentos();
  };

  const toggleVeiculo = () => {
    setDisplayClientes(false);
    setDisplayCondutor(false);
    setDisplayDeslocamento(false);
    setDisplayVeiculo(true);
    setDisplayPrevisao(false);
    getVeiculos();
  };

  const togglePrevisao = () => {
    setDisplayClientes(false);
    setDisplayCondutor(false);
    setDisplayDeslocamento(false);
    setDisplayVeiculo(false);
    setDisplayPrevisao(true);
    getPrevisao();
    // Lógica para obter previsão do tempo
  };

  return (
    <>
      <nav>
        <div className="topNav"></div>
        <div className="buttonsNav">
          <button className="button" onClick={toggleClientes}>
            <p>Cliente</p>
          </button>
          <button className="button" onClick={toggleCondutor}>
            <p>Condutor</p>
          </button>
          <button className="button" onClick={toggleDeslocamento}>
            <p>Deslocamento</p>
          </button>
          <button className="button" onClick={toggleVeiculo}>
            <p>Veiculo</p>
          </button>
          <button className="button" onClick={togglePrevisao}>
            <p>Previsão do tempo</p>
          </button>
        </div>
        <div className="footerNav"></div>
      </nav>
      <main>
        {/* inicio main cliente */}
        {displayClientes ? (
          <div className="clientes">
            <div className="nomesCliente">
              <div className="title">Clientes</div>
              {clientes
                ? clientes.map((item, index) => {
                    return (
                      <div className="icons" key={index}>
                        <p>{item.nome}</p>
                        <img
                          onClick={() => {
                            getClienteById(item.id);
                            setView(false);
                          }}
                          width={20}
                          src={edit}
                          alt=""
                        />
                        <img
                          onClick={() => deleteCliente(item.id)}
                          width={20}
                          src={delet}
                          alt=""
                        />
                        <img
                          onClick={() => {
                            getClienteById(item.id);
                            setView(true);
                          }}
                          width={20}
                          src={vizu}
                          alt=""
                        />
                      </div>
                    );
                  })
                : null}
            </div>
            <div className="mainCliente">
              <div className="divButtonNc">
                <button
                  className="buttonNC"
                  onClick={() => {
                    setCliente(novoCliente);
                  }}
                >
                  Novo cliente
                </button>
              </div>
              <div className="inputs">
                <input
                  value={cliente.nome}
                  onChange={(e) =>
                    setCliente({ ...cliente, nome: e.target.value })
                  }
                  placeholder="Nome"
                />
                <input
                  value={cliente.numeroDocumento}
                  onChange={(e) =>
                    setCliente({ ...cliente, numeroDocumento: e.target.value })
                  }
                  placeholder="Número do documento"
                />
                <input
                  value={cliente.tipoDocumento}
                  onChange={(e) =>
                    setCliente({ ...cliente, tipoDocumento: e.target.value })
                  }
                  placeholder="Tipo Documento"
                />
                <input
                  value={cliente.logradouro}
                  onChange={(e) =>
                    setCliente({ ...cliente, logradouro: e.target.value })
                  }
                  placeholder="Logradouro"
                />
                <input
                  value={cliente.numero}
                  onChange={(e) =>
                    setCliente({ ...cliente, numero: e.target.value })
                  }
                  placeholder="Numero"
                />
                <input
                  value={cliente.bairro}
                  onChange={(e) =>
                    setCliente({ ...cliente, bairro: e.target.value })
                  }
                  placeholder="Bairro"
                />
                <div className="buttonsMainCliente">
                  {cliente.id ? (
                    <button
                      className="button"
                      disabled={view}
                      onClick={() => {
                        editCliente(cliente);
                      }}
                    >
                      <p>Atualizar</p>
                    </button>
                  ) : (
                    <button
                      className="button"
                      onClick={() => {
                        postCliente();
                      }}
                    >
                      Cadastrar
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        ) : null}
        {/* fim main cliente */}

        {/* inicio main condutor */}
        {displayCondutor ? (
          <div className="condutores">
            <div className="nomesCondutor">
              <div className="title">Condutores</div>
              {condutores
                ? condutores.map((item, index) => {
                    return (
                      <div className="icons" key={index}>
                        <p>{item.nome}</p>
                        <img
                          onClick={() => {
                            getCondutorById(item.id);
                            setView(false);
                          }}
                          width={20}
                          src={edit}
                          alt=""
                        />
                        <img
                          onClick={() => deleteCondutor(item.id)}
                          width={20}
                          src={delet}
                          alt=""
                        />
                        <img
                          onClick={() => {
                            getCondutorById(item.id);
                            setView(true);
                          }}
                          width={20}
                          src={vizu}
                          alt=""
                        />
                      </div>
                    );
                  })
                : null}
            </div>
            <div className="mainCondutor">
              {/* Campos para Condutor */}
              <div className="divButtonNc">
                <button
                  className="buttonNC"
                  onClick={() => {
                    setCondutor(novoCondutor);
                  }}
                >
                  Novo condutor
                </button>
              </div>
              <div className="inputs">
                <input
                  value={condutor.nome}
                  onChange={(e) =>
                    setCondutor({ ...condutor, nome: e.target.value })
                  }
                  placeholder="Nome"
                />
                <input
                  value={condutor.numeroHabilitacao}
                  onChange={(e) =>
                    setCondutor({
                      ...condutor,
                      numeroHabilitacao: e.target.value,
                    })
                  }
                  placeholder="Número da Habilitacao"
                />
                <input
                  value={condutor.categoriaHabilitacao}
                  onChange={(e) =>
                    setCondutor({
                      ...condutor,
                      categoriaHabilitacao: e.target.value,
                    })
                  }
                  placeholder="Vencimento da Habilitação"
                />
                <input
                  value={condutor.vencimentoHabilitacao}
                  onChange={(e) =>
                    setCondutor({
                      ...condutor,
                      vencimentoHabilitacao: e.target.value,
                    })
                  }
                  placeholder="Vencimento da Habilitação"
                />

                <div className="buttonsMainCliente">
                  {condutor.id ? (
                    <button
                      className="button"
                      disabled={view}
                      onClick={() => {
                        editCondutor(condutor);
                      }}
                    >
                      <p>Atualizar</p>
                    </button>
                  ) : (
                    <button
                      className="button"
                      onClick={() => {
                        postCondutor();
                      }}
                    >
                      Cadastrar
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        ) : null}
        {/* fim main condutor */}

        {/* inicio deslocamento */}
        {displayDeslocamento ? (
          <div className="deslocamentos">
            <div className="nomesDeslocamento">
              <div className="title">Deslocamentoes</div>
              {deslocamentos
                ? deslocamentos.map((item, index) => {
                    return (
                      <div className="icons" key={index}>
                        <p>{item.status}</p>
                        <img
                          onClick={() => {
                            setView2(true);
                            getDeslocamentoById(item.id);
                          }}
                          width={20}
                          src={edit}
                          alt=""
                        />
                        <img
                          onClick={() => deleteDeslocamento(item.id)}
                          width={20}
                          src={delet}
                          alt=""
                        />
                        <img
                          onClick={() => {
                            getDeslocamentoById(item.id);
                            setView(true);
                          }}
                          width={20}
                          src={vizu}
                          alt=""
                        />
                      </div>
                    );
                  })
                : null}
            </div>
            <div className="mainDeslocamento">
              {/* Campos para Deslocamento */}
              <div className="divButtonNc">
                <button
                  className="buttonNC"
                  onClick={() => {
                    setDeslocamento(novoDeslocamento);
                  }}
                >
                  Novo deslocamento
                </button>
              </div>
              <div className="inputs">
                <input
                  value={deslocamento.kmInicial}
                  onChange={(e) =>
                    setDeslocamento({
                      ...deslocamento,
                      kmInicial: e.target.value,
                    })
                  }
                  placeholder="kmInicial"
                />
                <input
                  value={deslocamento.inicioDeslocamento}
                  onChange={(e) =>
                    setDeslocamento({
                      ...deslocamento,
                      inicioDeslocamento: e.target.value,
                    })
                  }
                  placeholder="inicioDeslocamento"
                />
                <input
                  value={deslocamento.checkList}
                  onChange={(e) =>
                    setDeslocamento({
                      ...deslocamento,
                      checkList: e.target.value,
                    })
                  }
                  placeholder="checkList"
                />
                <input
                  value={deslocamento.motivo}
                  onChange={(e) =>
                    setDeslocamento({ ...deslocamento, motivo: e.target.value })
                  }
                  placeholder="motivo"
                />
                <input
                  value={deslocamento.observacao}
                  onChange={(e) =>
                    setDeslocamento({
                      ...deslocamento,
                      observacao: e.target.value,
                    })
                  }
                  placeholder="observacao"
                />
                <input
                  value={deslocamento.idCondutor}
                  onChange={(e) =>
                    setDeslocamento({
                      ...deslocamento,
                      idCondutor: e.target.value,
                    })
                  }
                  placeholder="idCondutor"
                />
                <input
                  value={deslocamento.idVeiculo}
                  onChange={(e) =>
                    setDeslocamento({
                      ...deslocamento,
                      idVeiculo: e.target.value,
                    })
                  }
                  placeholder="idVeiculo"
                />
                <input
                  value={deslocamento.idCliente}
                  onChange={(e) =>
                    setDeslocamento({
                      ...deslocamento,
                      idCliente: e.target.value,
                    })
                  }
                  placeholder="idCliente"
                />

                {view2 ? (
                  <div className="divApper">
                    <input
                      value={deslocamento.kmFinal}
                      onChange={(e) =>
                        setDeslocamento({
                          ...deslocamento,
                          kmFinal: e.target.value,
                        })
                      }
                      placeholder="kmFinal"
                    />
                    <input
                      value={deslocamento.fimDeslocamento}
                      onChange={(e) =>
                        setDeslocamento({
                          ...deslocamento,
                          fimDeslocamento: e.target.value,
                        })
                      }
                      placeholder="fim Deslocamento"
                    />
                  </div>
                ) : null}

                <div className="buttonsMainCliente">
                  {deslocamento.id ? (
                    <button
                      className="button"
                      disabled={view}
                      onClick={() => {
                        editDeslocamento(deslocamento);
                      }}
                    >
                      <p>Atualizar</p>
                    </button>
                  ) : (
                    <button
                      className="button"
                      onClick={() => {
                        postDeslocamento();
                      }}
                    >
                      Cadastrar
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        ) : null}

        {/* fim deslocamento */}

        {/* inicio veiculo */}
        {displayVeiculo ? (
          <div className="veiculos">
            <div className="nomesVeiculo">
              <div className="title">Veiculo</div>
              {veiculos
                ? veiculos.map((item, index) => {
                    return (
                      <div className="icons" key={index}>
                        <p>{item.placa}</p>
                        <img
                          onClick={() => {
                            getVeiculoById(item.id);
                            setView(false);
                          }}
                          width={20}
                          src={edit}
                          alt=""
                        />
                        <img
                          onClick={() => deleteVeiculo(item.id)}
                          width={20}
                          src={delet}
                          alt=""
                        />
                        <img
                          onClick={() => {
                            getVeiculoById(item.id);
                            setView(true);
                          }}
                          width={20}
                          src={vizu}
                          alt=""
                        />
                      </div>
                    );
                  })
                : null}
            </div>
            <div className="mainVeiculo">
              {/* Campos para Veiculo */}
              <div className="divButtonNc">
                <button
                  className="buttonNC"
                  onClick={() => {
                    setVeiculo(novoVeiculo);
                  }}
                >
                  Novo condutor
                </button>
              </div>
              <div className="inputs">
                <input
                  value={veiculo.placa}
                  onChange={(e) =>
                    setVeiculo({ ...veiculo, placa: e.target.value })
                  }
                  placeholder="placa"
                />
                <input
                  value={veiculo.marcaModelo}
                  onChange={(e) =>
                    setVeiculo({ ...veiculo, marcaModelo: e.target.value })
                  }
                  placeholder="marcaModelo"
                />
                <input
                  value={veiculo.anoFabricacao}
                  onChange={(e) =>
                    setVeiculo({ ...veiculo, anoFabricacao: e.target.value })
                  }
                  placeholder="anoFabricacao"
                />
                <input
                  value={veiculo.kmAtual}
                  onChange={(e) =>
                    setVeiculo({ ...veiculo, kmAtual: e.target.value })
                  }
                  placeholder="kmAtual"
                />

                <div className="buttonsMainCliente">
                  {veiculo.id ? (
                    <button
                      className="button"
                      disabled={view}
                      onClick={() => {
                        editVeiculo(veiculo);
                      }}
                    >
                      <p>Atualizar</p>
                    </button>
                  ) : (
                    <button
                      className="button"
                      onClick={() => {
                        postVeiculo();
                      }}
                    >
                      Cadastrar
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        ) : null}
        {/* fim veiculo */}

        {/* inicio previsao */}

        {displayPrevisao ? (
          <div className="previsao">
            {previsao
              ? previsao.map((item) => (
                  <div className="previsao2" key={item.date}>
                    <p>data: {item.date}</p>
                    <p>temperatureC: {item.temperatureC}</p>
                    <p>temperatureF: {item.temperatureF}</p>
                    <p>summary: {item.summary}</p>
                  </div>
                ))
              : null}
          </div>
        ) : null}

        {/* fim previsao */}
      </main>
    </>
  );
}

export default App;
