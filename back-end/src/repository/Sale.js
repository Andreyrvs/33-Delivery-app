const BaseRepository = require('./Base');

class SaleRepository extends BaseRepository {
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

  async updateSaleStatus(id, status) {
    const update = await this.model.update(
      { status },
      { where: { id } },
    );
    return update;
  }
}

module.exports = SaleRepository;