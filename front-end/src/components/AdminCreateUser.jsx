import { useState, useEffect } from 'react';
import { fetchPost } from '../services/connectApi';
import '../css/AdminPage.css';
import validateEmail from '../util/validateEmail';

export default function AdminCreateUser() {
  const [nameUser, setNameUser] = useState('');
  const [emailUser, setEmailUser] = useState('');
  const [passwordUser, setPasswordUser] = useState('');
  const [roleUser, setRoleUser] = useState('seller');
  const [isDisabled, setIsDisabled] = useState(true);
  const [msgError, setMsgError] = useState('');
  const verifyNameLength = 12;
  const verifyPasswordLength = 6;
  const CREATED = 201;
  const CONFLICT = 409;

  // verify and disable button
  const nameLength = nameUser.length > verifyNameLength;
  const verifyEmail = validateEmail(emailUser);
  const verifyPass = passwordUser.length >= verifyPasswordLength;

  const userString = localStorage.getItem('user');
  const user = JSON.parse(userString);
  const { token } = user;

  const PAYLOAD = {
    name: nameUser,
    email: emailUser,
    password: passwordUser,
    role: roleUser,
  };

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

  const clearForm = () => {
    setNameUser('');
    setEmailUser('');
    setPasswordUser('');
  };

  const addUser = async (event) => {
    event.preventDefault();
    let result = '';
    const URL = 'http://localhost:3001/admin/register';
    if (nameLength && verifyEmail && verifyPass) {
      result = await fetchPost(URL, PAYLOAD, token);
    }
    if (result.status === CREATED) {
      console.log(result);
    } else if (result.status === CONFLICT) {
      setMsgError('Erro ao gravar! Usuário já cadastrado');
    }
    clearForm();
    setIsDisabled(true);
  };

  useEffect(() => {
    clearForm();
  }, []);

  useEffect(() => {
    if (nameLength && verifyEmail && verifyPass) {
      setIsDisabled(false);
    } /* else if (!nameLength || !verifyEmail || !verifyPass) {
      setIsDisabled(true);
    } */
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
      {
        msgError ? (
          <p
            className="cadastroMsgErro"
            data-testid="admin_manage__element-invalid-register"
          >
            { msgError }
          </p>
        ) : ''
      }
    </section>
  );
}
