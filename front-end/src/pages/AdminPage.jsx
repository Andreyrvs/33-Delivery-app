import AdminCreateUser from '../components/AdminCreateUser';
import Header from '../components/Header';

export default function AdminPage() {
  return (
    <section>
      <Header />
      <h1>Pagina do Adm</h1>
      <AdminCreateUser />
    </section>
  );
}
