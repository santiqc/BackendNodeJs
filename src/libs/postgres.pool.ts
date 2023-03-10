const { Pool } = require("pg");
import config from "./../config/config";

const options: any = {
  connectionString: config.dbUrl,
};

if (config.isProd) {
  options.ssl = {
    rejectUnauthorized: false,
  };
}

const pool = new Pool(options);

export default pool;
