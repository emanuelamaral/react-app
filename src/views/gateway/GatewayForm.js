import axios from "axios";
import { useReducer, useState } from "react";
import { IOT_API } from "../../Const";
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
    constructor(name = '', description = '', address = '') {
        this.name = name;
        this.description = description;
        this.address = address;
    }
}

function GatewayForm() {

    const nav = useNavigate();

    // Estado para gerenciar o submissão do formulário à API
    const [submitting, setSubmitting] = useState(false);
    const [showPassword, setShowPassword] = useState(false);


    // Função redutora --> estado do formulário
    const formReducer = (state, event) => {
        if(event.reset) {
            return new HTMLForm();
        }

        return {
            ...state,
            [event.name]: event.value
        }
    }

    // Reducer (estado complexo) para gerenciar dados do formulário
    const [formData, setFormData] = useReducer(formReducer, new HTMLForm());
    

    /**
     * Função para salvar os dados do formulário
     */
    function handleSave(event) {
        const data = {
            nome: formData.name,
            descricao: formData.description,
            endereco: formData.address,
          };
          
        console.log("FormData:", formData);

        // Definir um estado de submissão do formulário
        setSubmitting(true);

        // Fazer a requisição a API
        axios.post(`${IOT_API}gateway`, data, { 
            }).then(res => {
                console.log("Sucesso: ", res);
                alert("Gateway salvo com sucesso: " + res.data.id);
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

    return(
        <>
            <div className="content">
                <Row>
                    <Col xs="12">
                        <Card className="card-chart">
                            <CardHeader>
                                <Row>
                                    <Col className="text-left" sm="6">
                                        <CardTitle tag="h2">Formulário de Cadastro de Gateway</CardTitle>
                                    </Col>
                                </Row>
                                <form>
                                    <fieldset className="form-group" disabled={submitting}> 
                                        <label className="form-label">Nome</label>
                                        <input type="text" name="name" className="form-control"
                                            placeholder="Nome do Gateway" value={formData.name} onChange={handleChange} />
                                    </fieldset>

                                    <fieldset className="form-group" disabled={submitting}>
                                        <label className="form-label">Descrição</label>
                                        <input type="text" name="description" className="form-control"
                                            placeholder="Descrição do Gateway" value={formData.description} onChange={handleChange} />
                                    </fieldset>

                                    <fieldset className="form-group" disabled={submitting}>
                                        <label className="form-label">Endereço</label>
                                        <input type="text" name="address" className="form-control"
                                            placeholder="Endereço IP do Gateway" value={formData.address} onChange={handleChange} />
                                    </fieldset>
                                    <div className="mt-4" >
                                        <button type="button" disabled={submitting} className="btn btn-success me-1" onClick={handleSave} >Salvar</button>
                                        <button type="button" disabled={submitting} className="btn btn-light" onClick={() => nav('/admin')}>Cancelar</button>
                                    </div>
                                </form>
                            </CardHeader>
                        <CardBody/>
                        </Card>
                    </Col>
                </Row>
            </div>
        </> 
    );
}
export default GatewayForm;