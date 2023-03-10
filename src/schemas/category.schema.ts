import * as Joi from "joi";

export class CategorySchemas {
  public id = Joi.number().integer();
  public name = Joi.string().min(3).max(15);
  public image = Joi.string().uri();

  constructor() {}

  public createCategorySchema() {
    return Joi.object({
      name: this.name.required(),
      image: this.image.required(),
    });
  }

  public updateCategorySchema() {
    return Joi.object({
      name: this.name,
      image: this.image,
    });
  }

  public getCategorySchema() {
    return Joi.object({
      id: this.id.required(),
    });
  }
}
