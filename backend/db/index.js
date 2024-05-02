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

sequelize
  .authenticate()
  .then(() => {
    console.log("Connection successful");
  })
  .catch(() => {
    console.log("Error connection to database");
  });

const Questions = require("./Questions")(sequelize);
const Leaderboard = require("./Leaderboard")(sequelize);

module.exports = {
  sequelize: sequelize,
  Questions: Questions,
  Leaderboard: Leaderboard,
};
