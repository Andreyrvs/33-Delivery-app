const sinon = require("sinon");
const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../api/app");
const models = require("../database/models");
const Auth = require('../middlewares/TokenAuth');
const SaleValidations = require('../validations/Sale');
const { sale } = require("../Factory");

chai.use(chaiHttp);

const { expect } = chai;
const skolLata = (key) => ({
  id: 1,
  name: "Skol Lata 250ml",
  price: "2.20",
  urlImage: "http://localhost:3001/images/skol_lata_350ml.jpg",
  ...key
})

const heineken = (key) => ({
  id: 2,
  name: "Heineken 600ml",
  price: "7.50",
  urlImage: "http://localhost:3001/images/heineken_600ml.jpg",
  ...key
})

const antarcticaPilsen = (key) => ({
  id: 3,
  name: "Antarctica Pilsen 300ml",
  price: "2.49",
  urlImage: "http://localhost:3001/images/antarctica_pilsen_300ml.jpg",
  ...key
})

const sale1 = (...rest) => ({
  id: 1,
  userId: 3,
  sellerId: 2,
  totalPrice: "20.00",
  deliveryAddress: "address",
  deliveryNumber: "7",
  saleDate: "2022-09-29T21:04:30.000Z",
  status: "Pendente",
  products: [...rest],
})

const sale2 = (...rest) => ({
  id: 2,
  userId: 3,
  sellerId: 2,
  totalPrice: "10.00",
  deliveryAddress: "address2",
  deliveryNumber: "7",
  saleDate: "2022-09-29T21:04:31.000Z",
  status: "Pendente",
  products: [...rest],
})

const sale3 = {
  userId: 3,
  sellerId: 2,
  totalPrice: "10.00",
  deliveryAddress: "address2",
  deliveryNumber: "7",
  products: [{
    productId: 1,
    quantity: 3,
  }]
}

const sale4 = [{
  productId: 1,
  quantity: 3,
  saleId: 2,
  get: () => (sale4[0])
}]

const saleProduct = (qtt) => ({
  SaleProduct: {
    quantity: qtt,
  }
})

const quantity = (qtt) => ({
  quantity: qtt
})

const skolLataGet = { get: () => (skolLata(saleProduct(1)))};
const heinekenGet = { get: () => (heineken(saleProduct(2)))};
const antarcticaPilsenGet = { get: () => (antarcticaPilsen(saleProduct(3)))};
const sale1Get = { get: () => (sale1(skolLataGet, heinekenGet))};
const sale2Get = { get: () => (sale2(skolLataGet, heinekenGet, antarcticaPilsenGet))};

const sale1Formated = sale1(skolLata(quantity(1)), heineken(quantity(2)))
const sale2Formated = sale2(skolLata(quantity(1)), heineken(quantity(2)), antarcticaPilsen(quantity(3)))

const salesGet = [sale1Get, sale2Get];
const sales = [sale1Formated, sale2Formated];

describe("test rota get/Orders", () => {
  let chaiHttpResponse;

  afterEach(() => {
    sinon.restore();
  });

  it("Customer products success sale", async () => {
    sinon.stub(models.Sale, "findAll").resolves(salesGet);

    chaiHttpResponse = await chai.request(app)
      .get("/orders");

    expect(chaiHttpResponse.status).to.be.equal(200);
    expect(chaiHttpResponse.body).to.be.an("array");
    expect(chaiHttpResponse.body).to.deep.equal(sales);
  });


  it("Customer products success orders/:id", async () => {
    sinon.stub(models.Sale, "findAll").resolves(sale1Get);

    chaiHttpResponse = await chai.request(app)
      .get("/orders/1");

    expect(chaiHttpResponse.status).to.be.equal(200);
    expect(chaiHttpResponse.body).to.be.an("object");
    expect(chaiHttpResponse.body).to.deep.equal(sale1Formated);
  });
  
  it("teste creat fn sale", async () => {
    sinon.stub(models.Sale, "create").resolves(sale1Get);
    sinon.stub(Auth, 'customer').callsFake((req, res, nex) => (nex()))
    sinon.stub(SaleValidations, 'checkUser').resolves()
    sinon.stub(SaleValidations, 'checkSeller').resolves()
    sinon.stub(SaleValidations, 'checkProducts').resolves()
    sinon.stub(models.SaleProduct, 'bulkCreate').resolves(sale4)
    console.log('adawdawda', Auth.customer)

    chaiHttpResponse = await chai.request(app)
      .post("/customer/checkout")
      .send(sale3)

    expect(chaiHttpResponse.status).to.be.equal(201);
    expect(chaiHttpResponse.body).to.be.an("object");
    // expect(chaiHttpResponse.body).to.deep.equal(sales);
  });
  // it.only("Customer products error orders/:id", async () => {
  //   sinon.stub(models.Sale, "findAll").resolves(null);

  //   chaiHttpResponse = await chai.request(app)
  //     .get("/orders/3");

  //   expect(chaiHttpResponse.status).to.be.equal(200);
  //   expect(chaiHttpResponse.body).to.be.an("object");
  //   expect(chaiHttpResponse.body).to.deep.equal(null);
  // });
});
