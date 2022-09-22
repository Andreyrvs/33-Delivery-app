import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import validateEmail from '../util/validateEmail';
import '../css/Login.css';

export default function Login() {
  const history = useHistory();
  const [loginEmail, setloginEmail] = useState('');
  const [loginPassword, setloginPassword] = useState('');
  const [msgError, setmsgError] = useState('');
  const [isDisabled, setisDisabled] = useState(true);
  const SIX = 6;
  let user = {};

  const dataUserArrayTest = [
    { userEmail: 'zebirita@email.com', senha: '123456', userName: 'Robervaldo' },
  ];

  const validateDb = dataUserArrayTest.map((item) => {
    let result = '';
    if (loginEmail === item.userEmail && loginPassword === item.senha) {
      result = true;
      user = item;
      console.log(user);
    } else {
      result = false;
    }
    return result;
  });

  const handleInputEmail = ({ target }) => {
    setloginEmail(target.value);
  };

  const handleInputPassword = ({ target }) => {
    setloginPassword(target.value);
  };

  const clickbutton = (event) => {
    event.preventDefault();
    if (validateDb) {
      localStorage.setItem('user', user.userName);
      history.push('/customer/products');
    } else if (!validateDb) {
      setmsgError('Usuário ou senha inválidos');
    }
  };

  const adNewUser = () => {
    history.push('/register');
  };

  useEffect(() => {
    const validate = validateEmail(loginEmail);
    const psw = loginPassword.length >= SIX;
    if (validate && psw) {
      setisDisabled(false);
    }
  }, [loginEmail, loginPassword, msgError, validateDb]);

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
              data-testid="common_login__input-password"
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
          data-testid="common_login__button-login"
          onClick={ clickbutton }
          disabled={ isDisabled }
        >
          LOGIN
        </button>
        <button
          type="button"
          className="loginButAdd"
          data-testid="common_login__button-register"
          onClick={ adNewUser }
        >
          Ainda não tenho cadastro
        </button>
        <p
          className="loginMsgErro"
          data-testid="common_login__element-invalid-email"
        >
          {
            msgError.length > 1 ? msgError : ''
          }
        </p>
      </form>
    </div>
  );
}
