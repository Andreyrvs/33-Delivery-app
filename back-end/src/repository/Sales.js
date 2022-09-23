const BaseRepository = require('./Base');

class SaleRepository extends BaseRepository {
  async createMany(products) {
    const created = await this.model.bulkCreate(products);
    return created;
  }
}

module.exports = SaleRepository;