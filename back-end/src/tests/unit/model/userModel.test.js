const Factory = require('../../../Factory');

const sinon = require('sinon');
const { expect } = require('chai');

const { mock } = require('../../mocks/allMocks')
const models = require('../../../database/models');

describe('Testa a função  da camada models', () => {

  const userRepo = Factory.user().userRepository;

  afterEach(sinon.restore);

  describe('quando o retorno é bem sucedido', () => {
    
    it('retorna um obj', async () => {
      sinon.stub(models.User, 'findOne').resolves(mock);
      
      const response = await userRepo.getOneUser(mock.email);

      expect(response).to.be.an('object');
    });
  });
});
