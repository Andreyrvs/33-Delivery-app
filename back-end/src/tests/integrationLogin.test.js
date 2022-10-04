const sinon = require('sinon');
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../api/app');
const models = require('../database/models');

chai.use(chaiHttp);

const { expect } = chai;
const test = {
  "id": 1,
  "name": "Delivery App Admin",
  "email": "adm@deliveryapp.com",
  "password": "e10adc3949ba59abbe56e057f20f883e",
  "role": "administrator",
  get: () => (test)
}

describe('test rota POST/login', () => {
  let chaiHttpResponse;

    afterEach(() => {
      sinon.restore();
    })
  
    it('Login success', async () => {
      sinon.stub(models.User, "findOne").resolves(test);
      chaiHttpResponse = await chai
        .request(app)
        .post('/login')
        .send({
          email: "adm@deliveryapp.com",
          password: "123456"
        });

      expect(chaiHttpResponse.status).to.be.equal(200);
      expect(chaiHttpResponse.body).to.be.an('object');
      expect(chaiHttpResponse.body).to.be.have.property('token');
      // expect(chaiHttpResponse.body.message).to.be.equal('token');
    });

    it('login invalid', async () => {
      sinon.stub(models.User, "findOne").resolves(null);

      chaiHttpResponse = await chai
        .request(app)
        .post('/login')
        .send({
          email: 'wrongemail@wrongemail.com',
          password: '123456'
        });
      
      expect(chaiHttpResponse).to.have.status(404);
      expect(chaiHttpResponse.body).to.be.an('object');
      expect(chaiHttpResponse.body).to.deep.equal({ message: 'User not found' });
    });

    it('login email missing', async () => {
      chaiHttpResponse = await chai
        .request(app)
        .post('/login')
        .send({
          password: '123456'
        });
      expect(chaiHttpResponse).to.have.status(401);
      expect(chaiHttpResponse.body).to.be.an('object');
      expect(chaiHttpResponse.body).to.deep.equal({ message: 'The fields email and password are required' });
    });

    it('login password invalid', async () => {
      chaiHttpResponse = await chai
        .request(app)
        .post('/login')
        .send({
          email: 'fulana@deliveryapp.com',
          password: '12345'
        });
      expect(chaiHttpResponse).to.have.status(401);
      expect(chaiHttpResponse.body).to.be.an('object');
      expect(chaiHttpResponse.body).to.deep.equal({ message: 'Password must be at least 6 characters' });
    });

    it('login password missing', async () => {
      chaiHttpResponse = await chai
        .request(app)
        .post('/login')
        .send({
          email: 'fulana@deliveryapp.com',
        });
      expect(chaiHttpResponse).to.have.status(401);
      expect(chaiHttpResponse.body).to.be.an('object');
      expect(chaiHttpResponse.body).to.deep.equal({ message: 'The fields email and password are required' });
      
    });
  })
    
