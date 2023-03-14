const boom = require("@hapi/boom");

import sequelize from "./../libs/sequelize";
import { HashPassword } from "../hashPasword/pass-hash";

export class UserService {
  private hashPasword = new HashPassword();
  private array: any[];
  constructor() {
    this.array = [];
  }

  public async create(data: any) {
    const password = await this.hashPasword.hash(data.password);
    const newData = {
      ...data,
      password,
    };
    delete newData.password;
    return newData;
    // const newUser = await models.User.create(data);
    // return newUser;
  }

  public async find() {
    const rta = await sequelize.User.findAll();
    return rta;
  }

  public async findOne(id: string) {
    const user = await sequelize.User.findOne(id);
    if (!user) {
      throw boom.notFound("user not found");
    }
    return user;
  }
  public async findByEmail(email: string) {
        const user = await sequelize.User.findOne({
      where: { email }
    });
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
