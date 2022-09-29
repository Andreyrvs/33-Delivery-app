import { useState, useEffect } from 'react';
// import { useHistory } from 'react-router-dom';
import { fetchPost, fetchAll } from '../services/connectApi';

export default function AdminCreateUser() {
  const [nameUser, setNameUser] = useState('');
  const [emailUser, setEmailUser] = useState('');
  const [passwordUser, setPasswordUser] = useState('');
  const [roleUser, setRoleUser] = useState('seller');
  const [isDisabled, setIsDisabled] = useState(true);
  const url = 'http://localhost:3001/register';
  const newUser = {
    name: nameUser,
    email: emailUser,
    password: passwordUser,
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

  const addUser = async (event) => {
    event.preventDefault();
    const result = await fetchPost(url, newUser);
    console.log(result);
  };

  useEffect(() => {
    if (nameUser && emailUser && passwordUser && roleUser) {
      setIsDisabled(false);
    }
  }, [nameUser, emailUser, passwordUser, roleUser]);

  return (
    <section>
      <h1>Cadastrar Novo Usuário</h1>
      <form className="">
        <div className="">
          <label htmlFor="cadastroName">
            Nome
            <input
              id="cadastroName"
              type="text"
              className=""
              data-testid=""
              placeholder="Nome e sobrenome"
              name="cadastroName"
              onChange={ handleInputName }
              value={ nameUser }
            />
          </label>
        </div>
        <div className="">
          <label htmlFor="cadastroEmail">
            Email
            <input
              id="cadastroEmail"
              type="email"
              className=""
              data-testid="common_register__input-email"
              placeholder="seu-email@site.com.br"
              name="cadastroEmail"
              onChange={ handleInputName }
              value={ emailUser }
            />
          </label>
        </div>
        <div className="">
          <label htmlFor="cadastroPassword">
            Senha
            <input
              id="cadastroPassword"
              type="password"
              className=""
              data-testid="common_register__input-password"
              placeholder="********"
              name="cadastroPassword"
              minLength="6"
              value={ passwordUser }
              onChange={ handleInputName }
            />
          </label>
        </div>
        <label htmlFor="cadastroTipo" className="">
          Tipo
          <select
            id="cadastroTipo"
            className=""
            data-testid=""
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
          className=""
          data-testid="common_register__button-register"
          disabled={ isDisabled }
          onClick={ addUser }
        >
          CADASTRAR
        </button>
        {/*
          msgErro && (
            <p
              className="cadastroMsgErro"
              data-testid="common_register__element-invalid_register"
            >
              { msgErro }
            </p>
          )
          */}
      </form>
    </section>
  );
}
