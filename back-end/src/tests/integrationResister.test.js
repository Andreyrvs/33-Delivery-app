const sinon = require('sinon');
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../api/app');
const models  = require('../database/models');
// const UserValidations = require('../validations/User')
// const handleThrowError = require('../helpers/errorHandler')

chai.use(chaiHttp);

const { expect } = chai;

const newUser = 
  {
    "name": 'Cliente Zé Birita',
    "email": 'arsaitq@email.com',
    "password": '1b8418990a7b43826067912651b7c71d',
    get: () => (newUser),
    
  }
  
  const test = {
    "name": "Delivery App Admin",
    "email": "adm@deliveryapp.com",
    "password": "e10adc3949ba59abbe56e057f20f883e",
    "role": "administrator",
    get: () => (test)
  }

  describe('test rota POST/Resister', () => {
    let chaiHttpResponse;
       
    afterEach(() => {
      sinon.restore();
    })
    
    it('Resister success', async () => {
      // sinon.stub(UserValidations, 'checkIfCreated').returns();
      sinon.stub(models.User, "findOne").resolves(null);
      sinon.stub(models.User, 'create').resolves( newUser );

      chaiHttpResponse = await chai
      .request(app)
      .post('/register')
      .send({
        "name": 'Cliente Zé Birita',
        "email": 'arsaitq@email.com',
        "password": '1234576',
      });
      expect(chaiHttpResponse.status).to.be.equal(201);
      expect(chaiHttpResponse.body).to.be.an('object');
      // expect(chaiHttpResponse.body).to.be.have.property('token');
    });
    
    it('Resister invalid', async () => {

      sinon.stub(models.User, 'findOne').resolves(newUser);
      
      chaiHttpResponse = await chai
      .request(app)
      .post('/register')
      .send({
        "name": 'Cliente Zé Birita',
        "email": 'arsaitq@email.com',
        "password": '1234576',
      });
      
      expect(chaiHttpResponse.status).to.be.equal(409)
      expect(chaiHttpResponse.body).to.be.an('object');
      expect(chaiHttpResponse.body.message).to.be.equal('User already exists');
    });

    it('register name invalid ', async () => {
      chaiHttpResponse = await chai
        .request(app)
        .post('/register')
        .send({
          "name": "Andre",
          "email": 'arsaitq@email.com',
          "password": '1234576',
          
        });
      expect(chaiHttpResponse).to.have.status(401);
      expect(chaiHttpResponse.body).to.be.an('object');
    });

    it('register password invalid', async () => {
      chaiHttpResponse = await chai
        .request(app)
        .post('/register')
        .send({
          "name": 'Cliente Zé Birita',
          "email": 'arsaitq@email.com',
          "password": '12345',

        });
      expect(chaiHttpResponse).to.have.status(401);
      expect(chaiHttpResponse.body).to.be.an('object');
    });

    it('register email invalid', async () => {
      chaiHttpResponse = await chai
        .request(app)
        .post('/register')
        .send({
          "name": 'Cliente Zé Birita',
          "email": 'arsaitq@email',
          "password": '1234576',

        });
      expect(chaiHttpResponse).to.have.status(401);
      expect(chaiHttpResponse.body).to.be.an('object');
    });
  })
