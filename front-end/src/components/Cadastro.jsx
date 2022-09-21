import { useState, useEffect } from 'react';
import validateEmail from '../util/validateEmail';
import '../css/Cadastro.css';

export default function Cadastro() {
  const [nameUser, setName] = useState('');
  const [emailUser, setEmailUser] = useState('');
  const [passwordUser, setPasswordUser] = useState('');
  const [msgErro, setMsgError] = useState('');
  const [isDisabled, setIsDisabled] = useState(true);

  const handleInputName = ({ target }) => {
    if (target.name === 'cadastroName') {
      setName(target.value);
    } else if (target.name === 'cadastroEmail') {
      setEmailUser(target.value);
    } else if (target.name === 'cadastroPassword') {
      setPasswordUser(target.value);
    }
  };

  const dataUserArrayTest = [
    { userEmail: 'zebirita@email.com', senha: '123456' },
  ];

  const validateDb = dataUserArrayTest.find((item) => {
    let result = '';
    if (emailUser === item.userEmail) {
      result = true;
    } else {
      result = false;
    }
    return result;
  });

  const addUser = (event) => {
    event.preventDefault();
    const newUser = {
      nameUser,
      emailUser,
      passwordUser,
    };
    console.log(newUser);
    return newUser;
  };

  useEffect(() => {
    const SIX = 6;
    const validate = validateEmail(emailUser);
    const psw = passwordUser.length >= SIX;

    if (validateDb) {
      setMsgError('Usuário ja cadastrado');
    } else {
      setMsgError('');
    }
    if (validate && psw && !validateDb) {
      setIsDisabled(false);
    }
  }, [emailUser, passwordUser, msgErro, validateDb]);

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
              dataestid="common_register__input-password"
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
          dataestid="common_register__button-register"
          disabled={ isDisabled }
          onClick={ addUser }
        >
          CADASTRAR
        </button>
        <p
          className="cadastroMsgErro"
          dataestid="common_register__element-invalid_register"
        >
          {
            msgErro.length > 0 ? msgErro : ''
          }
        </p>
      </form>
    </div>
  );
}
