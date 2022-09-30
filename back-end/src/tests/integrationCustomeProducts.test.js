const sinon = require("sinon");
const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../api/app");
const models = require("../database/models");

chai.use(chaiHttp);

const { expect } = chai;

const skolLata = {
  id: 1,
  name: "Skol Lata 250ml",
  price: "2.20",
  urlImage: "http://localhost:3001/images/skol_lata_350ml.jpg",
}

const heineken = {
  id: 2,
  name: "Heineken 600ml",
  price: "7.50",
  urlImage: "http://localhost:3001/images/heineken_600ml.jpg",
}

const antarcticaPilsen = {
  id: 3,
  name: "Antarctica Pilsen 300ml",
  price: "2.49",
  urlImage: "http://localhost:3001/images/antarctica_pilsen_300ml.jpg",
}

const products = [skolLata, heineken, antarcticaPilsen];

describe("test rota POST/Resister", () => {
  let chaiHttpResponse;

  afterEach(() => {
    sinon.restore();
  });

  it("Customer products success", async () => {
    sinon.stub(models.Product, "findAll").resolves(products);

    chaiHttpResponse = await chai.request(app)
      .get("/customer/products")

    expect(chaiHttpResponse.status).to.be.equal(200);
    expect(chaiHttpResponse.body).to.be.an("array");
    expect(chaiHttpResponse.body).to.deep.equal(products);
    
  });

  it("Customer products falha", async () => {
    sinon.stub(models.Product, "findByPk").resolves(null);

    chaiHttpResponse = await chai.request(app)
      .get("/customer/products/5")

    expect(chaiHttpResponse.status).to.be.equal(404);
    expect(chaiHttpResponse.body).to.be.an("object");
    expect(chaiHttpResponse.body).to.deep.equal({ message: 'Has no product in batabase' });
  });

  it("Customer products success findByPk", async () => {
    sinon.stub(models.Product, "findByPk").resolves(heineken);

    chaiHttpResponse = await chai.request(app)
      .get("/customer/products/2")

    expect(chaiHttpResponse.status).to.be.equal(200);
    expect(chaiHttpResponse.body).to.be.an("object");
    expect(chaiHttpResponse.body).to.deep.equal(heineken);
  });
});
