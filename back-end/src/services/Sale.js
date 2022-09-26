const BaseService = require('./Base');
const SaleValidations = require('../validations/Sale');

class SaleService extends BaseService {
  constructor(repository, saleProductRepo, productRepo) {
    super(repository);
    this.saleProductRepo = saleProductRepo;
    this.productRepo = productRepo;
  }

  async create(fullSale) {
    const { products, ...sale } = fullSale;
    await SaleValidations.checkProducts(products, this.productRepo);
    const createdSale = await this.repository.create(sale);
    const addedProducts = await this.saleProductRepo.createMany(products, createdSale.id);
    return { ...createdSale.get(), products: addedProducts };
  }
}

module.exports = SaleService;