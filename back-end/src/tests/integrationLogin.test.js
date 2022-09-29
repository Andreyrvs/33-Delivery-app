const sinon = require('sinon');
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../api/app');
const { User }  = require('../database/models');
const { jwt } = require('../helpers/generateToken');
const { sign } = require('jsonwebtoken');


chai.use(chaiHttp);

const { expect } = chai;

describe('test rota POST/login', () => {
  let chaiHttpResponse;

  beforeEach(async () => {
    sinon
      .stub(User, "login")
      .resolves({
        "id": 2,
        "name": "Fulana Pereira",
        "email": "fulana@deliveryapp.com",
        "password": "3c28d2b0881bf46457a853e0b07531c6",
        "role": "seller"
    });
  });

    afterEach(() => {
      sinon.restore();
    })
  
    it('Login success', async () => {
    // sinon.stub(jwt, sign).returns('any-tokes')

      chaiHttpResponse = await chai
        .request(app)
        .post('/login')
        .send({
          email: 'zebirita@email.com',
          password: '$#zebirita#$'
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
      expect(chaiHttpResponse).to.have.status(401);
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
    
