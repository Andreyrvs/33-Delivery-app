import { useState, useEffect } from 'react';
import '../css/AdminPage.css';
// import MyContext from '../context/MyContext';
import { fetchAllUsers, fetchDelete } from '../services/connectApi';

export default function AdminListUsers() {
  const [listUser, setListUser] = useState();
  const userString = localStorage.getItem('user');
  const user = JSON.parse(userString);
  const { token } = user;
  const DELETESUCCES = 204;

  const getAllUsers = async () => {
    const result = await fetchAllUsers();
    const usersFilter = result.filter((item) => item.role !== 'administrator');
    setListUser(usersFilter);
  };

  const deleteUser = async (userId) => {
    const URL = `http://localhost:3001/admin/delete/${userId}`;
    const result = await fetchDelete(URL, token);
    console.log(result);
    if (result === DELETESUCCES) {
      getAllUsers();
    }
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  useEffect(() => {
    getAllUsers();
  }, [listUser]);

  return (
    <section className="adminListUsersContainer">
      <h1>Lista de usuários</h1>
      <div className="tableAdminListUsers">
        <div className="headerTableAdminLisUsers">
          <p className="tableIndex">Item</p>
          <p className="tableName">Nome</p>
          <p className="tableEmail">Email</p>
          <p className="tableType">Tipo</p>
          <p className="tableDelete">Excluir</p>
        </div>
        <div className="infoTableContainer">
          {listUser && listUser.map((item, index) => (
            <div key={ item.id } className="infoTableAdminList">
              <p
                className="infoIndex"
                value={ index + 1 }
                data-testid={ `admin_manage__element-user-table-item-number-${index}` }
              >
                {index + 1}
              </p>
              <p
                className="infoName"
                value={ item.name }
                data-testid={ `admin_manage__element-user-table-name-${index}` }
              >
                {item.name}
              </p>
              <p
                className="infoEmail"
                value={ item.email }
                data-testid={ `admin_manage__element-user-table-email-${index}` }
              >
                {item.email}
              </p>
              <p
                className="infoType"
                value={ item.role }
                data-testid={ `admin_manage__element-user-table-role-${index}` }
              >
                {item.role}
              </p>
              <button
                className="infoButtonDel"
                type="button"
                data-testid={ `admin_manage__element-user-table-remove-${index}` }
                onClick={ () => deleteUser(item.id) }
              >
                Excluir
              </button>
            </div>
          )) }
        </div>
      </div>
    </section>
  );
}
