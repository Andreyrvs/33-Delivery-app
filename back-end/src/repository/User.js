const BaseRepository = require('./Base');

class UserRepository extends BaseRepository {
  async getOneUser(email) {
    const result = await this.model.findOne({ where: { email } });
    return result;
  }
}

module.exports = UserRepository;