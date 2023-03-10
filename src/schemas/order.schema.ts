import * as Joi from "joi";

export class OrderSchemas {
  public id = Joi.number().integer();
  public customerId = Joi.number().integer();
  public orderId = Joi.number().integer();
  public productId = Joi.number().integer();
  public amount = Joi.number().integer().min(1);

  constructor() {}

  public getOrderSchema() {
    return Joi.object({
      id: this.id.required(),
    });
  }

  public createOrderSchema() {
    return Joi.object({
      customerId: this.customerId.required(),
    });
  }

  public addItemSchema() {
    return Joi.object({
      orderId: this.orderId.required(),
      productId: this.productId.required(),
      amount: this.amount.required(),
    });
  }
}
