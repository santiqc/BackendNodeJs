const boom = require("@hapi/boom");

import models from "../libs/sequelize";

export class CategoryService {
  constructor() {}

  public async create(data: any) {
    const newCategory = await models.Category.create(data);
    return newCategory;
  }

  public async find() {
    const categories = await models.Category.findAll();
    return categories;
  }

  public async findOne(id: string) {
    const category = await models.Category.findByPk(id, {
      include: ["products"],
    });
    return category;
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
