import * as express from "express";

import { ProductsService } from "../services/product-srv";
import { ValidateHandler } from "../middlewares/validate.handler";
import { ProductSchemas } from "../schemas/product.schema";

export class ProductRouter {
  public product: express.Express;
  public service = new ProductsService();
  public schemas = new ProductSchemas();
  public validate = new ValidateHandler();

  constructor() {
    this.product = express();

    const routerProduct = express.Router();

    routerProduct.get("/", async (req, res) => {
      const products = await this.service.find();
      res.json(products);
    });

    routerProduct.get(
      "/:id",
      this.validate.validator(this.schemas.getProductSchema(),"params"),
      async (req, res, next) => {
        try {
          const { id } = req.params;
          const product = await this.service.findOne(id);
          res.json(product);
        } catch (error) {
          next(error);
        }
      }
    );

    routerProduct.post(
      "/",
      this.validate.validator(this.schemas.createProductSchema(), "body"),
      async (req, res) => {
        const body = req.body;
        const newProduct = await this.service.create(body);
        res.status(201).json(newProduct);
      }
    );

    routerProduct.patch(
      "/:id",
      this.validate.validator(this.schemas.getProductSchema(), "params"),
      this.validate.validator(this.schemas.updateProductSchema(), "body"),
      async (req, res, next) => {
        try {
          const { id } = req.params;
          const body = req.body;
          const product = await this.service.update(id, body);
          res.json(product);
        } catch (error) {
          next(error);
        }
      }
    );

    routerProduct.delete(
      "/:id",
      this.validate.validator(this.schemas.getProductSchema(), "params"),
      async (req, res, next) => {
        try {
          const { id } = req.params;
          await this.service.delete(id);
          res.status(201).json({ id });
        } catch (error) {
          next(error);
        }
      }
    );
    this.product.use(routerProduct);
  }
}
