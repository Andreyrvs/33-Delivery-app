const BaseRepository = require('./Base');
const { handdleMap } = require('../helpers');

class SaleRepository extends BaseRepository {
  constructor(model, modelProduct) {
    super(model);
    this.modelProduct = modelProduct;
  }
  
  async create(sale) { // Array<produtos>
    const createdSale = await this.model.create(sale);
    return createdSale;
  }

  async listByCustomerId(id) {
    const orders = await this.model.findAll({ where: { userId: id } });
    return orders;
  }

  async listBySellerId(id) {
    const orders = await this.model.findAll({ where: { sellerId: id } });
    return orders;
  }

  async readWithProducts() {
    const orders = await this.model.findAll({
      include: {
        model: this.modelProduct,
        as: 'products',
        attributes: { exclude: ['urlImage'] },
        through: { attributes: ['quantity'] },
      },
    });
    const mappedproducts = handdleMap(orders[0].get().products);
    return { ...orders[0].get(), products: mappedproducts };
  }

  async readOneWithProducts(id) {
    const orders = await this.model.findOne({ where: { id },
      include: {
        model: this.modelProduct,
        as: 'products',
        attributes: { exclude: ['urlImage'] },
        through: { attributes: ['quantity'] },
      },
    });
    const mappedproducts = handdleMap(orders.get().products);
    return { ...orders.get(), products: mappedproducts };
  }
}

module.exports = SaleRepository;