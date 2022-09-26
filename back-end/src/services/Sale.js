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
    return allOrders;
  }

  async readOne(id) {
    const order = await this.repository.readOne(id);
    return order;
  }

  async create(fullSale) {
    const { products, ...sale } = fullSale;
    await SaleValidations.checkProducts(products, this.productRepo);
    await SaleValidations.checkUser(fullSale.userId, this.userRepo);
    await SaleValidations.checkSeller(fullSale.sellerId, this.userRepo);
    const createdSale = await this.repository.create(sale);
    const addedProducts = await this.saleProductRepo.createMany(products, createdSale.id);
    return { ...createdSale.get(), products: addedProducts };
  }
}

module.exports = SaleService;