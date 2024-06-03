import { IOT_API } from "../../Const.js";
import { React, useEffect, useState } from "react";
import axios from "axios";

import {
  Card,
  CardHeader,
  CardTitle,
} from "reactstrap";


function GatewaysList() {
    const [submitting, setSubmitting] = useState(false);
    const [data, setData] = useState([]); 
    useEffect(() => {
        fetch(`${IOT_API}gateway`)
        .then(response => response.json())
        .then(res => {
            setData(res);
        })
        .catch(e => console.log(e));
    });

  function handleDelete(id) {
    setSubmitting(true);
    axios.delete(`${IOT_API}gateway/${id}`)
      .then(res => {
        console.log("Sucesso: ", res);
        alert("Gateway deletado com sucesso!");
      })
      .catch(err => {
        console.log(err);
        alert("Falha ao deletar o gateway.");
      })
      .finally(() => setSubmitting(false));
  }
  
  return(
    <>
      <div className="content">
        <Card>
          <CardHeader>
            <CardTitle tag="h4">Gateways</CardTitle>
          </CardHeader>
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
                              <button className="btn btn-secondary" value={gat.id}>Editar</button>
                              <button className="btn btn-secondary ms-1" onClick={() => handleDelete(gat.id)}>Deletar</button>
                          </td>
                      </tr>
                  ))}
              </tbody>
          </table>
        </Card>
      </div>
    </>
  );
}

export default GatewaysList;
