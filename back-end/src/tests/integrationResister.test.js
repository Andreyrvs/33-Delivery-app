const sinon = require('sinon');
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../api/app');
const models  = require('../database/models');
const UserValidations = require('../validations/User')



chai.use(chaiHttp);

const { expect } = chai;

const newUser = 
  {
    "name": 'Cliente Zé Birita',
    "email": 'zxxxxit@email.com',
    "password": '1234576',
    get: () => (newUser),
    
  }
  const test = {
    "name": "Cliente Zé Birita",
    "email": "zebirita@email.com",
    "password": "$#zebirita#$",
    get: () => (test)
  }
  afterEach(() => {
    sinon.restore();
  })
  describe('test rota POST/Resister', () => {
    let chaiHttpResponse;
    
    sinon.stub(UserValidations, 'checkIfCreated').returns();
    sinon.stub(models.User, 'create').resolves( newUser );
  
  it('Resister success', async () => {

    chaiHttpResponse = await chai
    .request(app)
    .post('/register')
      .send(newUser);
      expect(chaiHttpResponse.status).to.be.equal(201);
      expect(chaiHttpResponse.body).to.be.an('object');
      // expect(chaiHttpResponse.body).to.be.have.property('token');
    });
    
    it('Resister invalid', async () => {
    sinon.stub(models.User, 'findOne').resolves( test );
      
      chaiHttpResponse = await chai
      .request(app)
      .post('/register')
      .send(test);
      
      console.log('eeeeeeeeeeeeeeeeeeeee', chaiHttpResponse.body);
      expect(chaiHttpResponse.status).to.be.equal(409);
      expect(chaiHttpResponse.body).to.be.an('object');
      expect(chaiHttpResponse.body.message).to.be.equal('User already exists');
    });

    // it('register email invalid ', async () => {
    //   chaiHttpResponse = await chai
    //     .request(app)
    //     .post('/register')
    //     .send({
    //       name: "Andrey Visniewski",
    //       email: "anderyinvalid@email.com",
    //       password: "6738a19f",
    //       role: "customer"

    //     });
    //   expect(chaiHttpResponse).to.have.status(401);
    //   expect(chaiHttpResponse.body).to.be.an('object');
    // });

    // it('register password invalid', async () => {
    //   chaiHttpResponse = await chai
    //     .request(app)
    //     .post('/register')
    //     .send({
    //       name: "Andrey Rannerson Visniewski",
    //       email: "andery@email.com",
    //       password: "6",

    //     });
    //   expect(chaiHttpResponse).to.have.status(401);
    //   expect(chaiHttpResponse.body).to.be.an('object');
    // });

    // it('register password missing', async () => {
    //   chaiHttpResponse = await chai
    //     .request(app)
    //     .post('/register')
    //     .send({
    //       name: "Andrey Rannerson Visniewski",
    //     });
    //   expect(chaiHttpResponse).to.have.status(401);
    //   expect(chaiHttpResponse.body).to.be.an('object');
    // });
  })
