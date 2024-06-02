// src/Login.js
import { useState } from 'react';
import icon from './assets/img/icon.png';
import './styles.css';
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { login } from './actions/authActions';

function Login() {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [error, setError] = useState('');
  
    const nav = useNavigate();
    const dispatch = useDispatch();
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  
    const handleLogin = (e) => {
      e.preventDefault();
      if (!email || !senha) {
        setError('Por favor, insira o e-mail e a senha.');
        return;
      }
      dispatch(login(email, senha));
      setError('Email ou Senha incorretos!');
    };
  
    const handleCadastro = (e) => {
      e.preventDefault();
      nav('/cadastro');
    };
  
    if (isAuthenticated) {
      nav('/admin/dashboard');
    }
  
    return (
      <div className="container">
        <div className="container-login">
          <div className="wrap-login">
            <form className="login-form">
              <span className="login-form-title">Bem Vindo!</span>
              <span className="login-form-title">
                <img src={icon} alt="icon" />
              </span>
              <div className="error-message">{error && <span>{error}</span>}</div>
              <div className="wrap-input">
                <input
                  className={email !== '' ? 'has-val input' : 'input'}
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <span className="focus-input" data-placeholder="Email"></span>
              </div>
              <div className="wrap-input">
                <input
                  className={senha !== '' ? 'has-val input' : 'input'}
                  type="password"
                  value={senha}
                  onChange={(e) => setSenha(e.target.value)}
                />
                <span className="focus-input" data-placeholder="Senha"></span>
              </div>
              <div className="container-login-form-btn">
                <button className="login-form-btn" onClick={handleLogin}>
                  Login
                </button>
              </div>
              <div className="text-center">
                <span className="txt1">Não possui conta?</span>
                <a className="txt2" href="#" onClick={handleCadastro}>
                  Criar Conta.
                </a>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
  
  export default Login;
  