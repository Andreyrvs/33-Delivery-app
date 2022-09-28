const BaseService = require('./Base');
const SaleValidations = require('../validations/Sale');

class SaleService extends BaseService {
  constructor(repository, saleProductRepo, productRepo, userRepo) {
    super(repository);
    this.saleProductRepo = saleProductRepo;
    this.productRepo = productRepo;
    this.userRepo = userRepo;
  }

  async read() {
    const allOrders = await this.repository.read();
    SaleValidations.emptyOrder(allOrders);
    return allOrders;
  }

  async readByCustomerId(id) {
    SaleValidations.reqId(id);
    const orders = await this.repository.listByCustomerId(id);
    SaleValidations.emptyOrder(orders);
    return orders;
  }

  async readBySellerId(id) {
    SaleValidations.reqId(id);
    const orders = await this.repository.listBySellerId(id);
    SaleValidations.emptyOrder(orders);
    return orders;
  }

  async readOne(id) {
    SaleValidations.reqId(id);
    const order = await this.repository.readOne(id);
    SaleValidations.emptyOrder(order);
    return order;
  }

  async create(fullSale) {
    SaleValidations.reqSale(fullSale);
    const { products, ...sale } = fullSale;
    await SaleValidations.checkProducts(products, this.productRepo);
    await SaleValidations.checkUser(fullSale.userId, this.userRepo);
    await SaleValidations.checkSeller(fullSale.sellerId, this.userRepo);
    const createdSale = await this.repository.create(sale);
    const addedProducts = await this.saleProductRepo.createMany(products, createdSale.id);
    const formatedProducts = addedProducts.map(async (e) => {
      const { productId, ...rest } = e.get();
      const product = await this.productRepo.readOne(productId);
      return { ...rest, name: product.get().name, price: product.get().price };
    });
    return { ...createdSale.get(), products: await Promise.all(formatedProducts) };
  }
}

module.exports = SaleService;