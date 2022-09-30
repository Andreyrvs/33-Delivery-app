import { useState, useEffect, useContext } from 'react';
// import { useHistory } from 'react-router-dom';
// import { fetchPost } from '../services/connectApi';
import '../css/AdminPage.css';
import MyContext from '../context/MyContext';
import validateEmail from '../util/validateEmail';

export default function AdminCreateUser() {
  const [nameUser, setNameUser] = useState('');
  const [emailUser, setEmailUser] = useState('');
  const [passwordUser, setPasswordUser] = useState('');
  const [roleUser, setRoleUser] = useState('seller');
  const [isDisabled, setIsDisabled] = useState(true);
  // const [msgError, setMsgError] = useState('');
  const { setNewUser, newUser } = useContext(MyContext);
  const verifyNameLength = 12;
  const verifyPasswordLength = 6;
  // const url = 'http://localhost:3001/register';
  const addNewUser = {
    name: nameUser,
    email: emailUser,
    password: passwordUser,
    role: roleUser,
  };
  // const history = useHistory();

  const handleInputName = ({ target }) => {
    if (target.name === 'cadastroName') {
      setNameUser(target.value);
    } else if (target.name === 'cadastroEmail') {
      setEmailUser(target.value);
    } else if (target.name === 'cadastroPassword') {
      setPasswordUser(target.value);
    } else if (target.name === 'cadastroTipo') {
      setRoleUser(target.value);
    }
  };

  /*
  const dataValidation = () => {
    if (nameUser.length < verifyNameLength) {
      setMsgError('O nome do usuário deve ter mais de 12 caracteres');
    } else if (!verifyEmail) {
      setMsgError('Email inválido, digite um endereço válido');
    } else if (passwordUser.length < verifyPasswordLength) {
      setMsgError('A senha deve ter mais de 6 caracteres');
    } else {
      return 'ok';
    }
  };
  */

  const clearForm = () => {
    setNameUser('');
    setEmailUser('');
    setPasswordUser('');
  };

  const addUser = (event) => {
    event.preventDefault();
    // const result = await fetchPost(url, newUser);
    setNewUser(() => [...newUser, addNewUser]);
    clearForm();
    setIsDisabled(true);
  };

  useEffect(() => {
    clearForm();
  }, []);

  // verify and disable button
  const nameLength = nameUser.length > verifyNameLength;
  const verifyEmail = validateEmail(emailUser);
  const verifyPass = passwordUser.length >= verifyPasswordLength;

  useEffect(() => {
    // console.log(nameLength, verifyEmail, verifyPass);
    if (nameLength && verifyEmail && verifyPass) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [nameUser, emailUser, passwordUser,
    isDisabled, nameLength, verifyEmail, verifyPass]);

  return (
    <section className="pageAdminContainer">
      <form className="formPageAdmin">
        <div className="nameFormAdmin">
          <label htmlFor="cadastroName">
            Nome
            <input
              id="cadastroName"
              type="text"
              className=""
              data-testid="admin_manage__input-name"
              placeholder="Nome e sobrenome"
              name="cadastroName"
              onChange={ handleInputName }
              value={ nameUser }
            />
          </label>
        </div>
        <div className="emailFormAdmin">
          <label htmlFor="cadastroEmail">
            Email
            <input
              id="cadastroEmail"
              type="email"
              className=""
              data-testid="admin_manage__input-email"
              placeholder="seu-email@site.com.br"
              name="cadastroEmail"
              onChange={ handleInputName }
              value={ emailUser }
            />
          </label>
        </div>
        <div className="passwordFormAdmin">
          <label htmlFor="cadastroPassword">
            Senha
            <input
              id="cadastroPassword"
              type="password"
              className=""
              data-testid="admin_manage__input-password"
              placeholder="********"
              name="cadastroPassword"
              minLength="6"
              value={ passwordUser }
              onChange={ handleInputName }
            />
          </label>
        </div>
        <label htmlFor="cadastroTipo" className="selectFormAdmin">
          Tipo
          <select
            id="cadastroTipo"
            className=""
            data-testid="admin_manage__select-role"
            name="cadastroTipo"
            value={ roleUser }
            onChange={ handleInputName }
          >
            <option value="seller">Vendedor</option>
            <option value="customer">Usuário</option>
            <option value="Administrator">Administrador</option>
          </select>
        </label>
        <button
          type="submit"
          className="buttonFormAdmin"
          data-testid="admin_manage__button-register"
          disabled={ isDisabled }
          onClick={ addUser }
        >
          CADASTRAR
        </button>
      </form>
      <p>
        {/*
          msgError ? (
            <p
              className="cadastroMsgErro"
              data-testid="admin_manage__element-invalid-register"
            >
              { msgError }
            </p>
          ) : ''
          */}
      </p>
    </section>
  );
}
