const dotenv = require("dotenv");
const Sequelize = require("sequelize");

dotenv.config({ path: "../.env" });

const sequelize = new Sequelize(
  process.env.PGDATABASE,
  process.env.PGUSER,
  process.env.PGPASSWORD,
  {
    host: process.env.PGHOST,
    dialect: "postgres",
    port: process.env.PGPORT,
  },
);

const Questions = require("./Questions")(sequelize);

module.exports = {
  sequelize: sequelize,
  Questions: Questions,
};
