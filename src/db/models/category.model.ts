const { Model, DataTypes, Sequelize } = require("sequelize");

const CATEGORY_TABLE = "users";
const CategorySchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  name: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  image: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: "created_at",
    defaultValue: Sequelize.NOW,
  },
};

class Category extends Model {
  static associate(models: any) {
    this.hasMany(models.Product, {
      as: "products",
      foreignKey: "categoryId",
    });
  }

  static config(sequelize: any) {
    return {
      sequelize,
      tableName: CATEGORY_TABLE,
      modelName: "Category",
      timestamps: false,
    };
  }
}

export { Category, CategorySchema, CATEGORY_TABLE };
