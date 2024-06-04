import axios from "axios";
import { useReducer, useState } from "react";
import { URL_API } from "../../Const";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import {
    Card,
    CardHeader,
    CardBody,
    CardTitle,
    Row,
    Col,
  } from "reactstrap";

class HTMLForm {
    constructor(first_name = '', last_name = '', email = '', senha = '') {
        this.first_name = first_name;
        this.last_name = last_name;
        this.email = email;
        this.senha = senha;
    }
}

function UserForm() {

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
        console.log(event)

        // Definir um estado de submissão do formulário
        setSubmitting(true);

        // Fazer a requisição a API
        axios.post(`${URL_API}users`, formData, { 
            headers: { 
                "Content-type": "application/json",
                Authorization: "token JWT gerado no login"
            }
        }).then(res => {
            console.log("Sucesso: ", res);
            alert("Usuário salvo com ID: " + res.data.id);
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

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    function handleCancel() {
        setFormData({ reset: true });
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
                                        <CardTitle tag="h2">Formulário de Cadastro</CardTitle>
                                    </Col>
                                </Row>
                                <form>
                                    <fieldset className="form-group" disabled={submitting}> 
                                        <label className="form-label">Primeiro nome</label>
                                        <input type="text" name="first_name" className="form-control"
                                            placeholder="Fulano" value={formData.first_name} onChange={handleChange} />
                                    </fieldset>

                                    <fieldset className="form-group" disabled={submitting}>
                                        <label className="form-label">Sobrenome</label>
                                        <input type="text" name="last_name" className="form-control"
                                            placeholder="de Tal" value={formData.last_name} onChange={handleChange} />
                                    </fieldset>

                                    <fieldset className="form-group" disabled={submitting}>
                                        <label className="form-label">E-mail</label>
                                        <input type="text" name="email" className="form-control"
                                            placeholder="fulano@x.com" value={formData.email} onChange={handleChange} />
                                    </fieldset>
                                    <fieldset className="form-group" disabled={submitting}>
                                        <label className="form-label">Senha</label>
                                        <div className="input-group">
                                            <input type={showPassword ? "text" : "password"} name="senha" className="form-control"
                                                placeholder="************" value={formData.senha} onChange={handleChange}
                                            />
                                            <div className="input-group-append">
                                                <button type="button" className="btn btn-outline-secondary btn-sm" onClick={togglePasswordVisibility}>
                                                    <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                                                </button>
                                            </div>
                                        </div>
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
export default UserForm;