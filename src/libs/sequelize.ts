const { Sequelize } = require("sequelize");

import config from "./../config/config";
import setupModels from "../db/models";

const options: any = {
  dialect: "postgres",
  logging: config.isProd ? false : true,
};

if (config.isProd) {
  options.dialectOptions = {
    ssl: {
      rejectUnauthorized: false,
    },
  };
}

const sequelize = new Sequelize(config.dbUrl, options);

setupModels(sequelize);

export default sequelize;
