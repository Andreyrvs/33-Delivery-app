// const { handleThrowError, generateToken, joi } = require('../helpers');
const BaseService = require('./Base');

class SaleService extends BaseService {
  constructor(repository, saleProductRepo) {
    super(repository);
    this.saleProductRepo = saleProductRepo;
  }
  
  async create(fullSale) {
    const { products, ...sale } = fullSale;
    const createdSale = await this.repository.create(sale);
    const addedProducts = await this.saleProductRepo.createMany(products, createdSale.id);
    return { ...createdSale.get(), products: addedProducts };
  }
}

module.exports = SaleService;