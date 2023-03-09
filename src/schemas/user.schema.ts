import * as Joi from "joi";

export class UserSchemas {
  public id = Joi.number().integer();
  public email = Joi.string().email();
  public password = Joi.string().min(8);

  constructor() {}

  public createUserSchema() {
    return Joi.object({
      email: this.email.required(),
      password: this.password.required(),
    });
  }

  public updateUserSchema() {
    return Joi.object({
      email: this.email,
    });
  }

  public getUserSchema() {
    return Joi.object({
      id: this.id.required(),
    });
  }
}
