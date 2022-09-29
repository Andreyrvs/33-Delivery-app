const sinon = require('sinon');
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../api/app');
const { User }  = require('../database/models');


chai.use(chaiHttp);

const { expect } = chai;

describe('test rota POST/Resister', () => {
  let chaiHttpResponse;

  beforeEach(async () => {
    sinon.stub(User, "login").resolves(null);
    sinon
      .stub(User, "create")
      .resolves({
        id: 3,
        name: "Cliente Zé Birita",
        email: "zebirita@email.com",
        password: "1c37466c159755ce1fa181bd247cb925",
        role: "customer"
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
          name: "Andrey Rannerson Visniewski",
          email: "andery@email.com",
          password: "6738a19f",
        });
      console.log('APAPAPAPAPAPAPAPAOAOAOAOAOAO', chaiHttpResponse)
      expect(chaiHttpResponse.status).to.be.equal(201);
      expect(chaiHttpResponse.body).to.be.an('object');
      expect(chaiHttpResponse.body).to.be.have.property('token');
    });

    it('Resister success', async () => {
      chaiHttpResponse = await chai
        .request(app)
        .post('/register')
        .send({
          name: "Andrey Rannerson Visniewski",
          email: "andery@email.com",
          password: "6738a19f",
        });
      console.log('APAPAPAPAPAPAPAPAOAOAOAOAOAO', chaiHttpResponse)
      expect(chaiHttpResponse.status).to.be.equal(201);
      expect(chaiHttpResponse.body).to.be.an('object');
      expect(chaiHttpResponse.body).to.be.have.property('token');
    });
  })
