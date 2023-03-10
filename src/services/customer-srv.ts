const boom = require("@hapi/boom");

import models from "./../libs/sequelize";

export class CustomerService {
  constructor() {}

  public async find() {
    const rta = await models.Customer.findAll({
      include: ["user"],
    });
    return rta;
  }

  public async findOne(id: string) {
    const user = await models.Customer.findByPk(id);
    if (!user) {
      throw boom.notFound("customer not found");
    }
    return user;
  }

  public async create(data: any) {
    const newCustomer = await models.Customer.create(data, {
      include: ["user"],
    });
    return newCustomer;
  }

  public async update(id: string, changes: any) {
    const model = await this.findOne(id);
    const rta = await model.update(changes);
    return rta;
  }

  public async delete(id: string) {
    const model = await this.findOne(id);
    await model.destroy();
    return { rta: true };
  }
}
