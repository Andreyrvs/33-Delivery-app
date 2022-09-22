const { handleThrowError } = require('../helpers/errorHandler');

class BaseService {
  constructor(repository) {
    this.repository = repository;
  }

  async create(body) {
    const created = await this.repository.create(body);
    return created.get();
  }

  async read() {
    const data = await this.repository.findAll();
    return data;
  }

  async readOne(where) {
    const data = await this.repository.findOne(where);
    if (!data) handleThrowError(`${this.repository.tableName} does not exist`);
    return data;
  }

  async update(id, body) {
    const updated = await this.repository.update(body, { where: { id } });
    if (!updated) handleThrowError(`${this.repository.tableName} does not exist`);
    return updated;
  }

  async delete(id) {
    const data = await this.repository.findOne({ where: { id } });
    if (!data) handleThrowError(`${this.repository.tableName} does not exist`);
    data.destroy();
    return ({ ...data.dataValues, status: 'Deleted Sucessfully' });
  }
}

module.exports = BaseService;