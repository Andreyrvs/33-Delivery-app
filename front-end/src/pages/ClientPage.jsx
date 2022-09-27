import { useContext, useEffect } from 'react';
import Card from '../components/Card';
import Header from '../components/Header';
import MyContext from '../context/MyContext';
import '../css/Clientes.css';
import { fecthProducts } from '../services/connectApi';
import { formattedNumber } from '../util/changeNumber';

function ClientPage() {
  const { products, setProducts } = useContext(MyContext);

  const getProducts = async () => {
    const items = await fecthProducts();
    setProducts(items);
  };

  useEffect(() => {
    if (!products) {
      getProducts();
    }
  });
  return (
    <div className="clientPageContainer">
      <Header pageName="PRODUTOS" />
      {
        products && (
          <div className="clientContainer">
            { products.map((item) => (
              <div key={ item.id } className="card">
                <Card
                  name={ item.name }
                  price={ formattedNumber(item.price) }
                  img={ item.urlImage }
                  className="card"
                  id={ item.id }
                />

              </div>
            ))}
          </div>
        )
      }
    </div>
  );
}

export default ClientPage;
