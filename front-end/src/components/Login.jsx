import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import '../css/Login.css';

export default function Login() {
  const history = useHistory();
  const [loginEmail, setloginEmail] = useState('');
  const [loginPassword, setloginPassword] = useState('');
  const [msgError, setmsgError] = useState('');
  const [loginStatus, setLoginStatus] = useState(false);
  const [isDisabled, setisDisabled] = useState(true);

  const validarEmail = (email) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  const handleInputEmail = ({ target }) => {
    setloginEmail(target.value);
  };

  const handleInputPassword = ({ target }) => {
    setloginPassword(target.value);
  };

  const clickbutton = () => {
    const NUMBER = 6;
    if (loginPassword.length < NUMBER) {
      setmsgError('A Senha deve ter no mínimo 6 caracteres');
    } else {
      setmsgError('');
      if (loginStatus) return history.push('/trybe');
    }
  };

  useEffect(() => {
    const SIX = 6;
    const validateEmail = validarEmail(loginEmail);
    const psw = loginPassword.length >= SIX;
    if (validateEmail && psw) {
      setLoginStatus(true);
      setisDisabled(false);
    }
  }, [loginEmail, loginPassword]);

  return (
    <div className="loginContainer">
      <form className="loginBox">
        <div className="loginInputContainer">
          <label htmlFor="loginEmail" className="">
            Login
            <input
              id="loginEmail"
              type="email"
              className="loginInput"
              data-testid="common_login__input-email"
              placeholder="email@tryber.com.br"
              name="loginEmail"
              value={ loginEmail }
              onChange={ handleInputEmail }
            />
          </label>
        </div>
        <div className="loginInputContainer">
          <label htmlFor="loginPassword">
            Senha
            <input
              id="loginPassword"
              type="password"
              className="loginInput"
              dataestid="common_login__input-password"
              placeholder="********"
              name="loginPassword"
              value={ loginPassword }
              onChange={ handleInputPassword }
              minLength="6"
            />
          </label>
        </div>
        <button
          type="submit"
          className="loginButton"
          dataestid="common_login__button-login"
          onClick={ clickbutton }
          disabled={ isDisabled }
        >
          LOGIN
        </button>
        <button
          type="button"
          className="loginButAdd"
          dataestid="common_login__button-register"
        >
          Ainda não tenho cadastro
        </button>
        <p
          className="loginMsgErro"
        >
          {
            msgError.length > 1 ? msgError : ''
          }
        </p>
      </form>
    </div>
  );
}
