const boom = require("@hapi/boom");

import models from "./../libs/sequelize";

export class UserService {
  constructor() {}

  async create(data: any) {
    const newUser = await models.User.create(data);
    return newUser;
  }

  async find() {
    const rta = await models.User.findAll();
    return rta;
  }

  async findOne(id: string) {
    const user = await models.User.findByPk(id);
    if (!user) {
      throw boom.notFound("user not found");
    }
    return user;
  }

  async update(id: string, changes: any) {
    const user = await this.findOne(id);
    const rta = await user.update(changes);
    return rta;
  }

  async delete(id: string) {
    const user = await this.findOne(id);
    await user.destroy();
    return { id };
  }
}
