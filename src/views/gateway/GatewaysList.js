import { IOT_API } from "../../Const.js";
import { React, useEffect, useState } from "react";
import axios from "axios";

import {
  Card,
  CardHeader,
  CardTitle,
  Row,
  Col,
  CardBody,
} from "reactstrap";


function GatewaysList() {
    const [submitting, setSubmitting] = useState(false);
    const [data, setData] = useState([]); 
    const [editGateway, setEditGateway] = useState(null);

    useEffect(() => {
      fetch(`${IOT_API}gateway`)
      .then(response => response.json())
      .then(res => {
        setData(res);
      })
      .catch(e => console.log(e));
    }, []);

    function handleDelete(id) {
      setSubmitting(true);
      axios.delete(`${IOT_API}gateway/${id}`)
      .then(res => {
        console.log("Sucesso: ", res);
        alert("Gateway deletado com sucesso!");
        setData(data.filter(gateway => gateway.id !== id));
      })
      .catch(err => {
        console.log(err);
        alert("Falha ao deletar o gateway.");
      })
      .finally(() => setSubmitting(false));
    }

    function handleEdit(gateway) {
      setEditGateway(gateway);
    }

    function handleFormSubmit(event) {
      event.preventDefault();
      setSubmitting(true);
      axios.put(`${IOT_API}gateway/${editGateway.id}`, editGateway)
        .then(res => {
          console.log("Sucesso: ", res);
          alert("Gateway atualizado com sucesso!");
          setData(data.map(gateway => gateway.id === editGateway.id ? editGateway : gateway));
          setEditGateway(null);
        })
        .catch(err => {
          console.log(err);
          alert("Falha ao atualizar o gateway.");
        })
        .finally(() => setSubmitting(false));
    }

    function handleInputChange(event) {
      const { name, value } = event.target;
      setEditGateway({ ...editGateway, [name]: value });
    }

    return(
      <>
      <div className="content">
          {editGateway ? (
          <Row>
              <Col xs="12">
              <Card className="card-chart">
                  <CardHeader>
                  <Row>
                      <Col className="text-left" sm="6">
                      <CardTitle tag="h2">Edição de Gateway</CardTitle>
                      </Col>
                  </Row>
                  <form onSubmit={handleFormSubmit}>
                      <fieldset className="form-group" disabled={submitting}> 
                      <label className="form-label">Nome</label>
                      <input 
                          type="text" 
                          name="nome"
                          className="form-control"
                          value={editGateway.nome}
                          onChange={handleInputChange} 
                      />
                      </fieldset>

                      <fieldset className="form-group" disabled={submitting}>
                      <label className="form-label">Descrição</label>
                      <input 
                          type="text"
                          name="descricao" 
                          className="form-control"
                          value={editGateway.descricao}
                          onChange={handleInputChange}
                      />
                      </fieldset>

                      <fieldset className="form-group" disabled={submitting}>
                      <label className="form-label">Endereço</label>
                      <input 
                          type="text" 
                          name="endereco" 
                          className="form-control"
                          value={editGateway.endereco}
                          onChange={handleInputChange} 
                      />
                      </fieldset>
                      <div className="mt-4" >
                      <button type="submit" disabled={submitting} className="btn btn-success me-1" >Salvar</button>
                      <button type="button" className="btn btn-light" onClick={() => setEditGateway(null)}>Cancelar</button>
                      </div>
                  </form>
                  </CardHeader>
                  <CardBody/>
              </Card>
              </Col>
          </Row>
          ) : (
          <Row>
              <Col xs="12">
              <Card className="card-chart">
                  <CardHeader>
                  <Row>
                      <Col className="text-left" sm="6">
                      <CardTitle tag="h2">Gateways</CardTitle>
                      </Col>
                  </Row>
                  <table className="table table-dark table-striped">
                      <thead>
                      <tr>
                          <th>Nome</th>
                          <th>Descrição</th>
                          <th>Endereço</th>
                          <th>Ações</th>
                      </tr>
                      </thead>
                      <tbody>
                      {data?.map(gat => (
                          <tr key={gat.id}>
                          <td>{gat.nome}</td> 
                          <td>{gat.descricao}</td>
                          <td>{gat.endereco}</td>
                          <td>
                              <button className="btn btn-secondary" onClick={() => handleEdit(gat)}>Editar</button>
                              <button className="btn btn-secondary ms-1" onClick={() => handleDelete(gat.id)}>Deletar</button>
                          </td>
                          </tr>
                      ))}
                      </tbody>
                  </table>
                  </CardHeader>
                  <CardBody/>
              </Card>
              </Col>
          </Row>
          )}
      </div>
      </>
    );
}

export default GatewaysList;
