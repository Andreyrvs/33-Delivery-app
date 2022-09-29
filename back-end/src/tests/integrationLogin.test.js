const sinon = require('sinon');
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../api/app');
const models = require('../database/models');

chai.use(chaiHttp);

const { expect } = chai;

describe('test rota POST/login', () => {
  let chaiHttpResponse;

  beforeEach(() => {
    sinon
      .stub(models.User, "findOrCreate")
      .resolves({
        "id": 1,
        "name": "Delivery App Admin",
        "email": "adm@deliveryapp.com",
        "password": "a4c86edecc5aee06eff8fdeda69e0d04",
        "role": "administrator"
    });
  });

    afterEach(() => {
      sinon.restore();
    })
  
    it('Login success', async () => {

      chaiHttpResponse = await chai
        .request(app)
        .post('/login')
        .send({
          email: "zebirita@email.com",
          password: "$#zebirita#$"
        });
      console.log('APAPAPAPAPAPAPAPAOAOAOAOAOAO', chaiHttpResponse);
      expect(chaiHttpResponse.status).to.be.equal(200);
      expect(chaiHttpResponse.body).to.be.an('object');
      expect(chaiHttpResponse.body).to.be.have.property('token');
    });

    it('login invalid', async () => {
      chaiHttpResponse = await chai
        .request(app)
        .post('/login')
        .send({
          email: 'marcilio@gamil.com',
          password: '123456'
        });
      expect(chaiHttpResponse).to.have.status(404);
      expect(chaiHttpResponse.body).to.be.an('object');
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
    });

    it('login password invalid', async () => {
      chaiHttpResponse = await chai
        .request(app)
        .post('/login')
        .send({
          email: 'fulana@deliveryapp.com',
          password: '123456789'
        });
      expect(chaiHttpResponse).to.have.status(401);
      expect(chaiHttpResponse.body).to.be.an('object');
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
    });
  })
    
