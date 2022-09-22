import Card from '../components/Card';
import Header from '../components/Header';
import '../css/Clientes.css';
import skol from '../assets/skol_lata_350ml.jpg';
import ant300 from '../assets/antarctica_pilsen_300ml.jpg';

function ClientPage() {
  const product = [
    {
      id: 1,
      name: 'Skol Lata 250ml',
      price: '2.20',
      img: skol,
    },
    {
      id: 2,
      name: 'Antartica Pilsen 300ml',
      price: '2.20',
      img: ant300,
    },
    {
      id: 2,
      name: 'Antartica300ml',
      price: '2.20',
      img: ant300,
    },
    {
      id: 2,
      name: 'Pilsen 300ml',
      price: '2.20',
      img: ant300,
    },
    {
      id: 2,
      name: 'Anta300ml',
      price: '2.20',
      img: ant300,
    },
    {
      id: 2,
      name: 'Antart00ml',
      price: '2.20',
      img: ant300,
    },
    {
      id: 2,
      name: 'Antarti0ml',
      price: '2.20',
      img: ant300,
    },
    {
      id: 2,
      name: 'Antar0ml',
      price: '2.20',
      img: ant300,
    },
  ];
  return (
    <div className="clientPageContainer">
      <Header />
      <div className="clientContainer">
        { product.map((item) => (
          <div key={ item.id } className="card">
            <Card
              name={ item.name }
              price={ `R$ ${item.price}` }
              img={ item.img }
              className="card"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default ClientPage;