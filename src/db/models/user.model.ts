const { Model, DataTypes, Sequelize } = require("sequelize");

const USER_TABLE = "users";
const UserSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  email: {
    allowNull: false,
    type: DataTypes.STRING,
    unique: true,
  },
  password: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  role: {
    allowNull: false,
    type: DataTypes.STRING,
    defaultValue: "customer",
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: "create_at",
    defaultValue: Sequelize.NOW,
  },
};

class User extends Model {
  static associate(models: any) {
    this.hasOne(models.Customer, {
      as: "customer",
      foreignKey: "userId",
    });
  }

  static config(sequelize: any) {
    return {
      sequelize,
      tableName: USER_TABLE,
      modelName: "User",
      timestamps: false,
    };
  }
}

export { USER_TABLE, UserSchema, User };
