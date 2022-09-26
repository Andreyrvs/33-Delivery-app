const BaseRepository = require('./Base');

class SaleRepository extends BaseRepository {
  async create(sale) { // Array<produtos>
    const createdSale = await this.model.create(sale);
    return createdSale;
  }
}

module.exports = SaleRepository;