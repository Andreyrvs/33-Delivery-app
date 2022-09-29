export default function AdminListUsers() {
  const MOCK = [{
    id: 1,
    name: 'Mock da Silva',
    email: 'mock@trybe.com',
    type: 'P. Vendedora',
  }];
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
          {MOCK && MOCK.map((item) => (
            <div key={ item.id } className="infoTableAdminList">
              <p className="infoIndex">{item.id}</p>
              <p className="infoName">{item.name}</p>
              <p className="infoEmail">{item.email}</p>
              <p className="infoType">{item.type}</p>
              <button
                className="infoButtonDel"
                type="button"
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
