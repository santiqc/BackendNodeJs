import * as express from "express";

import { orderService } from "../services/order-srv";
import { ValidateHandler } from "../middlewares/validate.handler";
import { OrderSchemas  } from "../schemas/order.schema";

export class OrdersRouter {
  public order: express.Express;
  private service = new orderService();
  private schemas = new OrderSchemas();
  private validate = new ValidateHandler();

  constructor() {
    this.order = express();

    const routerOrder = express.Router();
    routerOrder.get(
      "/:id",
      this.validate.validator(this.schemas.getOrderSchema(),"params"),
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
    routerOrder.get(
        '/:id',
        this.validate.validator(this.schemas.getOrderSchema(),"params"),
        async (req, res, next) => {
          try {
            const { id } = req.params;
            const order = await this.service.findOne(id);
            res.json(order);
          } catch (error) {
            next(error);
          }
        }
      );
      
      routerOrder.post(
        '/',
      this.validate.validator(this.schemas.createOrderSchema(),"body"),
        async (req, res, next) => {
          try {
            const body = req.body;
            const newOrder = await this.service.create(body);
            res.status(201).json(newOrder);
          } catch (error) {
            next(error);
          }
        }
      );
      
      routerOrder.post(
        '/add-item',
        this.validate.validator(this.schemas.addItemSchema(),"body"),
        async (req, res, next) => {
          try {
            const body = req.body;
            const newItem = await this.service.addItem(body);
            res.status(201).json(newItem);
          } catch (error) {
            next(error);
          }
        }
      );
    this.order.use(routerOrder);
  }
}
