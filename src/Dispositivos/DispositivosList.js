import { IOT_API } from "../../Const.js";
import { React, useEffect, useState } from "react";
import axios from "axios";
import {
  Card,
  CardHeader,
  CardTitle,
} from "reactstrap";



function Pagination({pages, changeActivePage, changePerPage, activePage}) {
    const itens = []; //Itens da paginação
    
    for(let i=0; i<pages; i++) {
        itens.push(
            <li className={ 'page-item ' + (activePage === (i+1) ? 'active' : '')} key={i}>
                <button className="page-link" onClick={() => changeActivePage(i+1)}>{i+1}</button>
            </li>
        )
    }

    return (
        <nav aria-label="Page navigation example" >
            <ul className="pagination justify-content-center">
                {itens}

                <li>
                    <select className="form-select ms-2" onChange={changePerPage}>
                        <option value={5}>5</option>
                        <option value={10}>10</option>
                        <option value={15}>15</option>
                    </select>
                </li>
            </ul>
        </nav>
    );

}



function DisposiList() {
    const [activePage, setActivePage] = useState(1); // Página ativa
    const [perPage, setPerPage] = useState(5); // Elementos por página
    const [data, setData] = useState([]);
  
    useEffect(() => {
        // Invocar a API
        fetch(`${IOT_API}dispositivo`)
        .then(response => response.json())
        .then(res => {
            // Mudar o estado do componente, sentando a variável 
            // data
            setData(res);
        })
        .catch(e => console.log(e));
    }, [activePage, perPage]);

    // Função para ser executada quando mudar o número da página ativa
    function handleChangeActivePage(page = 1) {
        console.log("oi", page);
        setActivePage(page);
    }

    // Função para ser executada quando mudar a quantidade de elementos por página
    function handleChangePerPage(event) {
        setPerPage(event.target.value);
    }

    return(
        <>
        <div className="content">
            <table className="table table-dark table-striped">
                <thead>
                    <tr>
                        <th></th>
                        <th>Nome</th>
                        <th>Descrição</th>
                        <th>Localização</th>
                    </tr>
                </thead>
                <tbody>
                    {data?.map(pes => (
                        <tr key={pes.id}>
                            <td>{pes.nome}</td> 
                            <td>{pes.descricao}</td>
                            <td>{pes.localizacao}</td>
                            <td>
                                <button className="btn btn-secondary" value={pes.id}>Editar</button>
                                <button className="btn btn-secondary ms-1">Deletar</button>
                            </td>
                        </tr>
                    ))}
                    
                </tbody>
            </table>


            <Pagination 
                pages={data.total_pages} 
                activePage={activePage}
                changeActivePage={handleChangeActivePage}
                changePerPage={handleChangePerPage}
            />
        </div>
        </>
    );
}
export default DisposiList;