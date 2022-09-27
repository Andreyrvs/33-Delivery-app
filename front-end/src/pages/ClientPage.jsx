import { useEffect, useState } from 'react';
import Card from '../components/Card';
import Header from '../components/Header';
import '../css/Clientes.css';
import { fecthProducts } from '../services/connectApi';
import { changeString } from '../util/changeNumber';

function ClientPage() {
  const [products, setProducts] = useState();

  const getProducts = async () => {
    const items = await fecthProducts();
    setProducts(items);
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div className="clientPageContainer">
      <Header pageName="Produtos" />
      {
        products && (
          <div className="clientContainer">
            { products.map((item) => (
              <div key={ item.id } className="card">
                <Card
                  name={ item.name }
                  price={ changeString(item.price) }
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
