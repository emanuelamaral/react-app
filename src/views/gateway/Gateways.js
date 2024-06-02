import React from "react";

// reactstrap components
import {
  Card,
  CardHeader,
  CardTitle,
} from "reactstrap";

function Gateways() {
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
                      <th></th>
                      <th>Nome</th>
                      <th>Descrição</th>
                      <th>Dispositivos Associados</th>
                  </tr>
              </thead>
              <tbody>
                  {/* {data?.data?.map(pes => (
                      <tr key={pes.id}>
                          <td><img width={50} src={pes.avatar} alt={pes.first_name}/></td>
                          <td>{pes.first_name} {pes.last_name}</td>
                          <td>{pes.email}</td>
                          <td>
                              <button className="btn btn-secondary" value={pes.id}>Editar</button>
                              <button className="btn btn-secondary ms-1">Deletar</button>
                          </td>
                      </tr>
                  ))} */}
                  
              </tbody>
          </table>


          {/* <Pagination 
              pages={data.total_pages} 
              activePage={activePage}
              changeActivePage={handleChangeActivePage}
              changePerPage={handleChangePerPage}
          /> */}
        </Card>
      </div>
    </>
  );
}

export default Gateways;
