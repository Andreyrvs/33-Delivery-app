import Header from '../components/Header';
import SellerOrders from '../components/SellerOrders';

export default function SellerOrdersPage() {
  return (
    <section>
      <Header pageName="Pedidos" />
      <div>
        <SellerOrders />
      </div>
    </section>
  );
}
