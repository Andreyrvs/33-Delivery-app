import AdminCreateUser from '../components/AdminCreateUser';
import AdminListUsers from '../components/AdminListUsers';
import Header from '../components/Header';

export default function AdminPage() {
  return (
    <section>
      <Header pageName="GERENCIAR USUÁRIOS" />
      <h1 className="titleAdminPage">Cadastrar novo usuário</h1>
      <AdminCreateUser />
      <AdminListUsers />
    </section>
  );
}
