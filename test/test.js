const chai = require("chai");
const chaiHttp = require("chai-http");
const should = chai.should();
chai.use(chaiHttp);

const app = "http://localhost:5000";
let truckId;

describe("/POST create truck", () => {
  it("it should create a truck", (done) => {
    chai
      .request(app)
      .post("/truck/create")
      .send({
        franchiseName: "Listen field Ice Cream Truck",
        owner: "park",
      })
      .end((err, res) => {
        res.should.have.status(201);
        truckId = res.body.truck._id;
        done(err);
      });
  });
});

describe("/POST newProduct", () => {
  it("it should create a product for the truck.", (done) => {
    chai
      .request(app)
      .post(`/truck/${truckId}/newProduct`)
      .send({
        name: "Lemon Ice Cream",
        price: 2,
        stock: 10,
      })
      .end((err, res) => {
        res.should.have.status(201);
        done(err);
      });
  });
});

describe("/POST newProduct", () => {
  it("it should create a product for the truck.", (done) => {
    chai
      .request(app)
      .post(`/truck/${truckId}/newProduct`)
      .send({
        name: "Shaved Ice",
        price: 4,
        stock: 10,
      })
      .end((err, res) => {
        res.should.have.status(201);
        done(err);
      });
  });
});

describe("/POST newProduct", () => {
  it("it should create a product for the truck.", (done) => {
    chai
      .request(app)
      .post(`/truck/${truckId}/newProduct`)
      .send({
        name: "Snack Bar",
        price: 1,
        stock: 10,
      })
      .end((err, res) => {
        res.should.have.status(201);
        done(err);
      });
  });
});

describe("/POST buyProduct", () => {
  it("it should buy a product from the truck.", (done) => {
    chai
      .request(app)
      .post(`/truck/${truckId}/buy`)
      .send({
        productName: "Lemon Ice Cream",
        quantity: 1,
      })
      .end((err, res) => {
        res.should.have.status(201);
        done(err);
      });
  });
});

describe("/GET inventory", () => {
  it("it should access a truck's inventory.", (done) => {
    chai
      .request(app)
      .get(`/truck/${truckId}`)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.inventory["Lemon Ice Cream"].should.equal(9);
        res.body.truck.earnings.should.equal(2);
        done(err);
      });
  });
});
