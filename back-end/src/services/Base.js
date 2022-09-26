const { handleThrowError, httpStatusCode } = require('../helpers');

class BaseService {
  constructor(repository) {
    this.repository = repository;
  }

  async create(body) {
    const created = await this.repository.create(body);
    return created.get();
  }

  async read() {
    const data = await this.repository.read();
    return data;
  }

  async readOne(where) {
    const data = await this.repository.readOne(where);
    if (!data) {
      handleThrowError(`${this.repository.tableName} does not exist`, httpStatusCode.NOT_FOUND);
    }
    return data;
  }

  async update(id, body) {
    const updated = await this.repository.update(body, { where: { id } });
    if (!updated) {
      handleThrowError(`${this.repository.tableName} does not exist`, httpStatusCode.NOT_FOUND);
    }
    return updated;
  }

  async delete(id) {
    const data = await this.repository.delete({ where: { id } });
    if (!data) {
      handleThrowError(`${this.repository.tableName} does not exist`, httpStatusCode.NOT_FOUND);
    }
    data.destroy();
    return ({ ...data.dataValues, status: 'Deleted Sucessfully' });
  }
}

module.exports = BaseService;