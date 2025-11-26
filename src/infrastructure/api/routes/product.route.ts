import express, { Request, Response } from "express";
import CreateProductUseCase from "../../../usecase/product/create/create.product.usecase";
import ProductRepository from "../../product/repository/sequelize/product.repository";
import ListProductUseCase from "../../../usecase/product/list/list.product.usecase";
import ProductPresenter from "../presenters/product.presenter";

export const productRoute = express.Router();

const productRepository = new ProductRepository();

productRoute.post("/", async (req: Request, res: Response) => {
  const usecase = new CreateProductUseCase(productRepository);
  try {
    const productDto = {
      name: req.body.name,
      price: req.body.price
    };
    //console.log("Creating product with:", productDto); // Log 1
    const output = await usecase.execute(productDto);
    //console.log("Product created:", output); // Log 2
    res.send(output);
  } catch (err) {
    //console.log("Error creating product:", err); // Log 3
    res.status(500).send(err);
  }
});

productRoute.get("/", async (req: Request, res: Response) => {
  const usecase = new ListProductUseCase(productRepository);
  const output = await usecase.execute({});
  //console.log("Products fetched:", output); // Log 4

  res.format({
    json: async () => res.send(output),
    xml: async () => res.send(ProductPresenter.listXML(output)),
  });
});