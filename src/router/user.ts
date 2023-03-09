import * as express from "express";

import { UserService } from "../services/user-srv";
import { ValidateHandler } from "../middlewares/validate.handler";
import { UserSchemas } from "../schemas/user.schema";

export class UserRouter {
  public user: express.Express;
  private service = new UserService();
  private schemas = new UserSchemas();
  private validate = new ValidateHandler();

  constructor() {
    this.user = express();

    const routerUser = express.Router();

    routerUser.get("/", async (req, res, next) => {
      try {
        const users = await this.service.find();
        res.json(users);
      } catch (error) {
        next(error);
      }
    });

    routerUser.get(
      "/:id",
      this.validate.validator(this.schemas.getUserSchema(), "params"),
      async (req, res, next) => {
        try {
          const { id } = req.params;
          const category = await this.service.findOne(id);
          res.json(category);
        } catch (error) {
          next(error);
        }
      }
    );

    routerUser.post(
      "/",
      this.validate.validator(this.schemas.createUserSchema(), "body"),
      async (req, res, next) => {
        try {
          const body = req.body;
          const newCategory = await this.service.create(body);
          res.status(201).json(newCategory);
        } catch (error) {
          next(error);
        }
      }
    );

    routerUser.patch(
      "/:id",
      this.validate.validator(this.schemas.getUserSchema(), "params"),
      this.validate.validator(this.schemas.updateUserSchema(), "body"),
      async (req, res, next) => {
        try {
          const { id } = req.params;
          const body = req.body;
          const category = await this.service.update(id, body);
          res.json(category);
        } catch (error) {
          next(error);
        }
      }
    );

    routerUser.delete(
      "/:id",
      this.validate.validator(this.schemas.getUserSchema(), "params"),
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
    this.user.use(routerUser);
  }
}
