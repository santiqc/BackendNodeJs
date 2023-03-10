import * as express from "express";

import { CategoryService } from "../services/category-srv";
import { ValidateHandler } from "../middlewares/validate.handler";
import { CategorySchemas } from "../schemas/category.schema";

export class CategoriesRouter {
  public category: express.Express;
  private service = new CategoryService();
  private schemas = new CategorySchemas();
  private validate = new ValidateHandler();

  constructor() {
    this.category = express();

    const routerCategory = express.Router();

    routerCategory.get("/", async (req, res, next) => {
      try {
        const categories = await this.service.find();
        res.json(categories);
      } catch (error) {
        next(error);
      }
    });

    routerCategory.get(
      "/:id",
      this.validate.validator(this.schemas.getCategorySchema(), "params"),
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

    routerCategory.post(
      "/",
      this.validate.validator(this.schemas.createCategorySchema(), "body"),

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

    routerCategory.patch(
      "/:id",
      this.validate.validator(this.schemas.getCategorySchema(), "params"),
      this.validate.validator(this.schemas.updateCategorySchema(), "body"),
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

    routerCategory.delete(
      "/:id",
      this.validate.validator(this.schemas.getCategorySchema(), "params"),

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

    this.category.use(routerCategory);
  }
}
