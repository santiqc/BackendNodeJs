import * as Joi from "joi";

export class CustomerSchemas {
  public id = Joi.number().integer();
  public name = Joi.string().min(3).max(30);
  public lastName = Joi.string();
  public phone = Joi.string();
  public userId = Joi.number().integer();
  public email = Joi.string().email();
  public password = Joi.string();

  constructor() {}

  public getCustomerSchema() {
    return Joi.object({
      id: this.id.required(),
    });
  }

  public createCustomerSchema() {
    return Joi.object({
      name: this.name.required(),
      lastName: this.lastName.required(),
      phone: this.phone.required(),
      user: Joi.object({
        email: this.email.required(),
        password: this.password.required(),
      }),
    });
  }

  public updateCustomerSchema() {
    return Joi.object({
      name: this.name,
      lastName: this.lastName,
      phone: this.phone,
      userId: this.userId,
    });
  }
}
