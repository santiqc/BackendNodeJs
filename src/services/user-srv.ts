const boom = require("@hapi/boom");

import models from "./../libs/sequelize";

export class UserService {
  constructor() {}

  public async create(data: any) {
    const newUser = await models.User.create(data);
    return newUser;
  }

  public async find() {
    const rta = await models.User.findAll();
    return rta;
  }

  public async findOne(id: string) {
    const user = await models.User.findByPk(id);
    if (!user) {
      throw boom.notFound("user not found");
    }
    return user;
  }

  public async update(id: string, changes: any) {
    const user = await this.findOne(id);
    const rta = await user.update(changes);
    return rta;
  }

  public async delete(id: string) {
    const user = await this.findOne(id);
    await user.destroy();
    return { id };
  }
}
