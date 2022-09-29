import Header from '../components/Header';
import SellerOrderDetails from '../components/SellerOrderDetails';

export default function SellerOrdersDetailPage() {
  return (
    <section>
      <Header pageName="PEDIDOS" />
      <div>
        <h1>Detalhes do pedido para o vendedor</h1>
      </div>
      <SellerOrderDetails />
    </section>
  );
}
