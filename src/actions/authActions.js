import axios from 'axios';
import {TOKEN_API} from '../Const';

export const register = (name, email, password) => {
    return async (dispatch) => {
      try {
        const userData = { name, email, password };
        const response = await fetch('https://example.com/api/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(userData)
        });

        if (!response.ok) {
          throw new Error('Ocorreu um erro ao cadastrar o usuário');
        }
        dispatch({ type: 'REGISTER_SUCCESS', payload: { name, email } });
      } catch (error) {
        console.error('Erro ao cadastrar usuário:', error.message);
      }
    };
  };

export const login = (email, password) => {
    return (dispatch) => {
        if (email === 'admin@hotmail.com' && password === '123456') {
            dispatch({ type: 'LOGIN_SUCCESS' });
        } else {
            dispatch({ type: 'LOGIN_FAILURE' });
        }
    }
}
