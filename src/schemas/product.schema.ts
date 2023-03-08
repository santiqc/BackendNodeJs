import * as Joi from 'joi';

export class ProductSchemas {
  public id = Joi.string().uuid();
  public name = Joi.string().min(3).max(15);
  public price = Joi.number().integer().min(10);
  public image = Joi.string().uri();

  constructor() {}

  public createProductSchema() {
    return Joi.object({
      name: this.name.required(),
      price: this.price.required(),
      image: this.image.required(),
    });
  }

  public updateProductSchema() {
    return Joi.object({
      name: this.name,
      price: this.price,
      image: this.image,
    });
  }

  public getProductSchema() {
    return Joi.object({
      id: this.id.required(),
    });
  }
}
