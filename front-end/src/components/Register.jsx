import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import validateEmail from '../util/validateEmail';
import { fetchPost } from '../services/connectApi';
import '../css/Register.css';

export default function Register() {
  const [nameUser, setName] = useState('');
  const [emailUser, setEmailUser] = useState('');
  const [passwordUser, setPasswordUser] = useState('');
  const [msgErro, setMsgError] = useState();
  const [isDisabled, setIsDisabled] = useState(true);
  const history = useHistory();
  const url = 'http://localhost:3001/register';
  const newUser = {
    name: nameUser,
    email: emailUser,
    password: passwordUser,
  };

  const userLocal = {
    name: nameUser,
    email: emailUser,
    password: passwordUser,
    role: 'customer',
  };

  const CREATED = 201;
  const CONFLICT = 409;

  const handleInputName = ({ target }) => {
    if (target.name === 'cadastroName') {
      setName(target.value);
    } else if (target.name === 'cadastroEmail') {
      setEmailUser(target.value);
    } else if (target.name === 'cadastroPassword') {
      setPasswordUser(target.value);
    }
  };

  const addUser = async (event) => {
    event.preventDefault();
    // console.log(newUser);
    const result = await fetchPost(url, newUser);
    if (result.status === CREATED) {
      localStorage.setItem('user', JSON.stringify(userLocal));
      history.push('/customer/products');
    } if (result.status === CONFLICT) {
      setMsgError('Usuário já existe');
    }
  };

  useEffect(() => {
    const SIX = 6;
    const TWELVE = 12;
    const validate = validateEmail(emailUser);
    const psw = passwordUser.length >= SIX;
    const vertifyNameLength = nameUser.length >= TWELVE;

    if (validate && psw && vertifyNameLength) {
      setIsDisabled(false);
    }
  }, [emailUser, passwordUser, msgErro, nameUser]);

  return (
    <div className="cadastroContainer">
      <form className="cadastroBox">
        <div className="cadastroInputContainer">
          <label htmlFor="cadastroName">
            Nome
            <input
              id="cadastroName"
              type="text"
              className="cadastroInput"
              data-testid="common_register__input-name"
              placeholder="Seu nome"
              name="cadastroName"
              onChange={ handleInputName }
              value={ nameUser }
            />
          </label>
        </div>
        <div className="cadastroInputContainer">
          <label htmlFor="cadastroEmail">
            Email
            <input
              id="cadastroEmail"
              type="email"
              className="cadastroInput"
              data-testid="common_register__input-email"
              placeholder="seu-email@site.com.br"
              name="cadastroEmail"
              onChange={ handleInputName }
              value={ emailUser }
            />
          </label>
        </div>
        <div className="cadastroInputContainer">
          <label htmlFor="cadastroPassword">
            Senha
            <input
              id="cadastroPassword"
              type="password"
              className="loginInput"
              data-testid="common_register__input-password"
              placeholder="********"
              name="cadastroPassword"
              minLength="6"
              value={ passwordUser }
              onChange={ handleInputName }
            />
          </label>
        </div>
        <button
          type="submit"
          className="cadastroButton"
          data-testid="common_register__button-register"
          disabled={ isDisabled }
          onClick={ addUser }
        >
          CADASTRAR
        </button>
        {
          msgErro && (
            <p
              className="cadastroMsgErro"
              data-testid="common_register__element-invalid_register"
            >
              { msgErro }
            </p>
          )
        }
      </form>
    </div>
  );
}
