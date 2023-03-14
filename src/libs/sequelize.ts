import { Sequelize } from 'sequelize-typescript';

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

const sequelize:any = new Sequelize(config.dbUrl, options);

setupModels(sequelize);

export default sequelize;
