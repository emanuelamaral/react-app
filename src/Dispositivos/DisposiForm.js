import axios from "axios";
import { useReducer, useState } from "react";
import { IOT_API } from "../Const";
import { useNavigate } from "react-router-dom";

import {
    Card,
    CardHeader,
    CardBody,
    CardTitle,
    Row,
    Col,
} from "reactstrap";

class HTMLForm {
    constructor(nome = '', descricao = '', localizacao = '') {
        this.nome = nome;
        this.descricao = descricao;
        this.localizacao = localizacao;
    }
}

function DispositivoForm() {
    const nav = useNavigate();

    const [submitting, setSubmitting] = useState(false);

    const formReducer = (state, event) => {
        if (event.reset) {
            return new HTMLForm();
        }

        return {
            ...state,
            [event.name]: event.value
        }
    }

    const [formData, setFormData] = useReducer(formReducer, new HTMLForm());

    function handleSave(event) {
        setSubmitting(true);

        axios.post(`${IOT_API}dispositivo`, formData, {
            headers: {
                "Content-type": "application/json",
                // Adicione quaisquer cabeçalhos de autorização necessários
            }
        }).then(res => {
            console.log("Sucesso: ", res);
            alert("Dispositivo cadastrado com ID: " + res.data.id);
            setFormData({ reset: true });
        }).catch(err => {
            console.error(err);
            alert("Falha ao cadastrar dispositivo");
        }).finally(() => setSubmitting(false));
    }

    function handleChange(event) {
        const isCheckbox = event.target.type === "checkbox";

        setFormData({
            name: event.target.name,
            value: isCheckbox ? event.target.checked : event.target.value
        });
    }

    return (
        <>
            <div className="content">
                <Row>
                    <Col xs="12">
                        <Card className="card-chart">
                            <CardHeader>
                                <Row>
                                    <Col className="text-left" sm="6">
                                        <CardTitle tag="h2">Formulário de Cadastro de Dispositivo</CardTitle>
                                    </Col>
                                </Row>
                                <form>
                                    <fieldset className="form-group" disabled={submitting}>
                                        <label className="form-label">Nome</label>
                                        <input type="text" name="nome" className="form-control"
                                            placeholder="Nome" value={formData.nome} onChange={handleChange} />
                                    </fieldset>

                                    <fieldset className="form-group" disabled={submitting}>
                                        <label className="form-label">Descrição</label>
                                        <input type="text" name="descricao" className="form-control"
                                            placeholder="Descrição" value={formData.descricao} onChange={handleChange} />
                                    </fieldset>

                                    <fieldset className="form-group" disabled={submitting}>
                                        <label className="form-label">Localização</label>
                                        <input type="text" name="localizacao" className="form-control"
                                            placeholder="Localização" value={formData.localizacao} onChange={handleChange} />
                                    </fieldset>

                                    <div className="mt-4">
                                        <button type="button" disabled={submitting} className="btn btn-success me-1" onClick={handleSave}>Salvar</
                                        button>
                                        <button type="button" disabled={submitting} className="btn btn-light" onClick={() => nav('/user')}>Cancelar</button>
                                    </div>
                                </form>
                            </CardHeader>
                            <CardBody />
                        </Card>
                    </Col>
                </Row>
            </div>
        </>
    );
}

export default DispositivoForm;
