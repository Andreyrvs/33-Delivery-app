import { Link } from 'react-router-dom';
import FinalizeCard from '../components/FinalizeCard';
import Header from '../components/Header';
import '../css/Checkout.css';

export default function CheckoutPage() {
  return (
    <div>
      <Header pageName="Checkout" />
      <section className="finalize-card">
        <FinalizeCard />
      </section>

      <Link to="/customer/products">
        <p>Voltar</p>
      </Link>
    </div>
  );
}
