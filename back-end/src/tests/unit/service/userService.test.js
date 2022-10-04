// const Factory = require('../../../Factory');

// const sinon = require('sinon');
// const chai = require('chai');
// const chaiHttp = require('chai-http');

// const app = require('../../../api/app');
// const jwt = require('../../../helpers/generateToken');
// const { mockLogin, mockLoginCorrect, mockLoginIncorrect, newUser, newUserWhithId } = require('../../mocks/allMocks');
// // const { mockArray } = require('../../mocks/allMocks')
// const models = require('../../../database/models');
// const generateToken = require('../../../helpers/generateToken');
// chai.use(chaiHttp);
// const { expect } = chai;


// describe('Testa a função  da camada service login', () => {

//   const userRepo = Factory.user().userService;

//   afterEach(sinon.restore);

//   describe("quando login da certo", () => {
//     it("sucessfully", async () => {
//       sinon.stub(models.User, 'findOne').resolves({
//         id: 1,
//         name: 'New usuário',
//         email: 'user@deliveryapp.com',
//         password: "a4c86edecc5aee06eff8fdeda69e0d04",
//         role: 'customer',
//       })
//       const response = await chai.request(app)
//       .post('/login')
//       .set({ 'Authorization': token ({
//         role: "admin",
//       })
//     })
//     // sinon.stub(models.User, 'getOneUser').resolves(newUserWhithId);
//       // .send({ email: newUser.email, password: '123456'});
//       // expect(response.body).to.be.deep.equal(newUser);
//       expect(response.status).to.have.status(200);
//       expect(chaiHttpResponse.body).to.have.a.property('role');
//     });
//   });
// });
