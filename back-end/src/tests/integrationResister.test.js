const sinon = require('sinon');
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../api/app');
const models  = require('../database/models');


chai.use(chaiHttp);

const { expect } = chai;

describe('test rota POST/Resister', () => {
  let chaiHttpResponse;

  beforeEach(() => {
    sinon.
    sinon
      .stub(models.User, 'create')
      .resolves({
        "name": "Cliente Zé Birita",
        "email": "zebirita@email.com",
        "password": "1c37466c159755ce1fa181bd247cb925",
        // "role": "customer"
      });
  });

  afterEach(() => {
      sinon.restore();
    })
  
    it('Resister success', async () => {
      chaiHttpResponse = await chai
        .request(app)
        .post('/register')
        .send({
          "name": "Cliente Zé Bir",
          "email": "zeia@email.com",
          "password": "123456"
        });
      console.log('APAPAPAPAPAPAPAPAOAOAOAOAOAOkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk')
      console.log('APAPAPAPAPAPAPAPAOAOAOAOAOAO', chaiHttpResponse)
      expect(chaiHttpResponse.status).to.be.equal(201);
      expect(chaiHttpResponse.body).to.be.an('object');
      expect(chaiHttpResponse.body).to.be.have.property('token');
    });

    it('Resister invalid', async () => {
      chaiHttpResponse = await chai
        .request(app)
        .post('/register')
        .send({
          name: "Cliente Zé Birita",
          email: "zebirita@email.com",
          password: "$#zebirita#$",
        });
      console.log('APAPAPAPAPAPAPAPAOAOAOAOAOAO', chaiHttpResponse)
      expect(chaiHttpResponse.status).to.be.equal(409);
      expect(chaiHttpResponse.body).to.be.an('object');
    });

    it('register email invalid ', async () => {
      chaiHttpResponse = await chai
        .request(app)
        .post('/register')
        .send({
          name: "Andrey Visniewski",
          email: "anderyinvalid@email.com",
          password: "6738a19f",
        });
      expect(chaiHttpResponse).to.have.status(401);
      expect(chaiHttpResponse.body).to.be.an('object');
    });

    it('register password invalid', async () => {
      chaiHttpResponse = await chai
        .request(app)
        .post('/register')
        .send({
          name: "Andrey Rannerson Visniewski",
          email: "andery@email.com",
          password: "6",
        });
      expect(chaiHttpResponse).to.have.status(401);
      expect(chaiHttpResponse.body).to.be.an('object');
    });

    it('register password missing', async () => {
      chaiHttpResponse = await chai
        .request(app)
        .post('/register')
        .send({
          name: "Andrey Rannerson Visniewski",
        });
      expect(chaiHttpResponse).to.have.status(401);
      expect(chaiHttpResponse.body).to.be.an('object');
    });
  })
