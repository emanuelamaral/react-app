import axios from 'axios';
import {TOKEN_API} from '../Const';

// Função de registro
export const register = (name, email, password) => {
    return async (dispatch) => {
        try {
            const userData = { name, email, password };
            const response = await axios.post(`${TOKEN_API}users`, userData, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (response.status !== 200) {
                throw new Error('Ocorreu um erro ao cadastrar o usuário');
            }
            dispatch({ type: 'REGISTER_SUCCESS', payload: { name, email } });
        } catch (error) {
            console.error('Erro ao cadastrar usuário:', error.message);
        }
    };
};

// Função de login
export const login = (email, password) => {
    return async (dispatch) => {
        try {
            const response = await axios.post('http://localhost:5000/api/login', { email, password }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (response.status !== 200) {
                throw new Error('Credenciais inválidas');
            }

            const { token } = response.data;

            // Armazena o token no localStorage
            localStorage.setItem('jwtToken', token);

            // Dispara uma ação de sucesso de login
            dispatch({ type: 'LOGIN_SUCCESS', payload: { token } });
        } catch (error) {
            console.error('Erro ao fazer login:', error.message);
            dispatch({ type: 'LOGIN_FAILURE', error: error.message });
        }
    };
};

// Função para verificar o token JWT
export const verifyToken = () => {
    return async (dispatch) => {
        try {
            const token = localStorage.getItem('jwtToken');
            if (!token) {
                throw new Error('Token não encontrado');
            }

            const response = await axios.get('http://localhost:5000/api/verify-token', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.status !== 200) {
                throw new Error('Token inválido');
            }

            dispatch({ type: 'TOKEN_VALID' });
        } catch (error) {
            console.error('Erro ao verificar token:', error.message);
            dispatch({ type: 'TOKEN_INVALID', error: error.message });
        }
    };
};
