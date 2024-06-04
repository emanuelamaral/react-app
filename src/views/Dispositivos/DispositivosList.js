import { IOT_API } from "../../Const.js";
import { React, useEffect, useState } from "react";
import axios from "axios";
import { Card, CardHeader, CardTitle } from "reactstrap";

function Pagination({ pages, changeActivePage, changePerPage, activePage }) {
    const itens = []; //Itens da paginação

    for (let i = 0; i < pages; i++) {
        itens.push(
            <li className={'page-item ' + (activePage === (i + 1) ? 'active' : '')} key={i}>
                <button className="page-link" onClick={() => changeActivePage(i + 1)}>{i + 1}</button>
            </li>
        );
    }

    return (
        <nav aria-label="Page navigation example">
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
    const [submitting, setSubmitting] = useState(false);
    const [editingDevice, setEditingDevice] = useState(null);

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

    function handleDelete(id) {
        setSubmitting(true);
        axios.delete(`${IOT_API}dispositivo/${id}`)
            .then(res => {
                console.log("Sucesso: ", res);
                alert("Dispositivo deletado com sucesso!");
                // Atualize a lista de dispositivos após a exclusão
                setData(data.filter(device => device.id !== id));
            })
            .catch(err => {
                console.log(err);
                alert("Falha ao deletar o dispositivo.");
            })
            .finally(() => setSubmitting(false));
    }

    function handleEdit(device) {
        setEditingDevice(device);
    }

    function handleChangeActivePage(page = 1) {
        console.log("oi", page);
        setActivePage(page);
    }

    function handleChangePerPage(event) {
        setPerPage(event.target.value);
    }

    function handleFormSubmit(event) {
        event.preventDefault();
        setSubmitting(true);
        axios.put(`${IOT_API}dispositivo/${editingDevice.id}`, editingDevice)
            .then(res => {
                console.log("Sucesso: ", res);
                alert("Dispositivo atualizado com sucesso!");
                // Atualize a lista de dispositivos com o dispositivo atualizado
                setData(data.map(device => device.id === editingDevice.id ? editingDevice : device));
                setEditingDevice(null);
            })
            .catch(err => {
                console.log(err);
                alert("Falha ao atualizar o dispositivo.");
            })
            .finally(() => setSubmitting(false));
    }

    function handleInputChange(event) {
        const { name, value } = event.target;
        setEditingDevice({ ...editingDevice, [name]: value });
    }

    return (
        <div className="content">
            {editingDevice ? (
                <form onSubmit={handleFormSubmit}>
                    <div className="mb-3">
                        <label className="form-label">Nome</label>
                        <input
                            type="text"
                            className="form-control"
                            name="nome"
                            value={editingDevice.nome}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Descrição</label>
                        <input
                            type="text"
                            className="form-control"
                            name="descricao"
                            value={editingDevice.descricao}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Localização</label>
                        <input
                            type="text"
                            className="form-control"
                            name="localizacao"
                            value={editingDevice.localizacao}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Endereço</label>
                        <input
                            type="text"
                            className="form-control"
                            name="endereco"
                            value={editingDevice.endereco}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-primary" disabled={submitting}>Salvar</button>
                    <button type="button" className="btn btn-secondary ms-2" onClick={() => setEditingDevice(null)}>Cancelar</button>
                </form>
            ) : (
                <>
                    <Card>
                        <CardHeader>
                            <CardTitle tag="h4">Dispositivos</CardTitle>
                        </CardHeader>
                        <table className="table table-dark table-striped">
                            <thead>
                                <tr>
                                    <th>Nome</th>
                                    <th>Descrição</th>
                                    <th>Localização</th>
                                    <th>Endereço</th>
                                    <th>Ações</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data?.map(pes => (
                                    <tr key={pes.id}>
                                        <td>{pes.nome}</td>
                                        <td>{pes.descricao}</td>
                                        <td>{pes.localizacao}</td>
                                        <td>{pes.endereco}</td>
                                        <td>
                                            <button className="btn btn-secondary" onClick={() => handleEdit(pes)}>Editar</button>
                                            <button className="btn btn-secondary ms-1" onClick={() => handleDelete(pes.id)}>Deletar</button>
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
                    </Card>
                </>
            )}
        </div>
    );
}

export default DisposiList;
