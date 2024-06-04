import axios from "axios";
import { useReducer, useState } from "react";
import { IOT_API } from "../../Const.js";
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
    constructor(nome = '', descricao = '', localizacao = '', endereco = '') {
        this.nome = nome;
        this.descricao = descricao;
        this.localizacao = localizacao;
        this.endereco = endereco;
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
        const data = {
            nome: formData.nome,
            descricao: formData.descricao,
            localizacao: formData.localizacao,
            endereco: formData.endereco,
          };
          
        console.log("FormData:", formData);
        setSubmitting(true);

        axios.post(`${IOT_API}dispositivo`, data, { 
            }).then(res => {
                console.log("Sucesso: ", res);
                alert("Dispositivo salvo com sucesso: " + res.data.id);
                setFormData({reset: true});
            }).catch(err => {
                console.log(err);
                alert("Falha ao salvar");
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

                                    <fieldset className="form-group" disabled={submitting}>
                                        <label className="form-label">Endereço</label>
                                        <input type="text" name="endereco" className="form-control"
                                            placeholder="Endereço" value={formData.endereco} onChange={handleChange} />
                                    </fieldset>

                                    <div className="mt-4">
                                        <button type="button" disabled={submitting} className="btn btn-success me-1" onClick={handleSave}>Salvar</
                                        button>
                                        <button type="button" disabled={submitting} className="btn btn-light"  onClick={() => nav('/admin')}>Cancelar</button>
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
