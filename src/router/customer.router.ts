import * as express from "express";

import { CustomerService } from "../services/customer-srv";
import { ValidateHandler } from "../middlewares/validate.handler";
import { CustomerSchemas } from "../schemas/customer.schema";

export class CustomerRouter {
  public customer: express.Express;
  private service = new CustomerService();
  private schemas = new CustomerSchemas();
  private validate = new ValidateHandler();

  constructor() {
    this.customer = express();

    const routerCustomer = express.Router();

    routerCustomer.get("/", async (req, res, next) => {
      try {
        res.json(await this.service.find());
      } catch (error) {
        next(error);
      }
    });

    routerCustomer.post(
      "/",
      this.validate.validator(this.schemas.createCustomerSchema(), "body"),
      async (req, res, next) => {
        try {
          const body = req.body;
          res.status(201).json(await this.service.create(body));
        } catch (error) {
          next(error);
        }
      }
    );

    routerCustomer.patch(
      "/:id",
      this.validate.validator(this.schemas.getCustomerSchema(), "params"),
      this.validate.validator(this.schemas.updateCustomerSchema(), "body"),
      async (req, res, next) => {
        try {
          const { id } = req.params;
          const body = req.body;
          res.status(201).json(await this.service.update(id, body));
        } catch (error) {
          next(error);
        }
      }
    );

    routerCustomer.delete(
      "/:id",
      this.validate.validator(this.schemas.getCustomerSchema(), "params"),
      async (req, res, next) => {
        try {
          const { id } = req.params;
          res.status(200).json(await this.service.delete(id));
        } catch (error) {
          next(error);
        }
      }
    );

    this.customer.use(routerCustomer);
  }
}
