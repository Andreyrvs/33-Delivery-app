class BaseRepository {
  constructor(model) {
    this.model = model;
  }

  create(obj) {
    return this.model.create(obj);
  }

  read() {
    return this.model.getAll();
  }

  readOne(id) {
    return this.service.getOne(id);
  }

  update(id, obj) {
    return this.service.update(id, obj);
  }

  delete(id) {
    return this.service.delete(id);
  }
}

module.exports = BaseRepository;