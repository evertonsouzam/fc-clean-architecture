import request from "supertest";
import { app, sequelize } from "../express";

describe("E2E test for customer", () => {
  beforeEach(async () => {
    await sequelize.sync({ force: true });
  });
  afterAll(async () => {
    await sequelize.close();
  });

  it("should create a product", async () => {
    const response = await request(app)
      .post("/product")
      .send({
        name: "Produto A",
        price: 10
      });
    expect(response.status).toBe(200);
    expect(response.body.name).toBe("Produto A");
  });

  it("should not create a product", async () => {
    const response = await request(app).post("/product").send({
      name: "Product B",
      price: -10
    });
    expect(response.status).toBe(500);
  });

  it("should list all product", async () => {
    const response = await request(app)
      .post("/product")
      .send({
        name: "Product A",
        price: 10
      });
    expect(response.status).toBe(200);
    const response2 = await request(app)
      .post("/product")
      .send({
        name: "Product B",
        price: 20
      });
    expect(response2.status).toBe(200);

    const listResponse = await request(app).get("/product");

    expect(listResponse.status).toBe(200);
    //    expect(listResponse.body.products.length).toBe(2);

  });

});