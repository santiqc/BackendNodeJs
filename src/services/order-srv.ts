const boom = require("@hapi/boom");

import { any } from "joi";
import models from "./../libs/sequelize";

export class orderService {
  constructor() {}

  public async create(data: any) {
    const newOrder = await models.Order.create(data);
    return newOrder;
  }

  public async addItem(data: any) {
    const newItem = await models.OrderProduct.create(data);
    return newItem;
  }

  public async find():Promise<any> {
    return [];
  }

  public async findOne(id: string) {
    const order = await models.Order.findByPk(id, {
      include: [
        {
          association: "customer",
          include: ["user"],
        },
        "items",
      ],
    });
    return order;
  }

  public async update(id: string, changes: any) {
    return {
      id,
      changes,
    };
  }

  public async delete(id: string) {
    return { id };
  }
}
