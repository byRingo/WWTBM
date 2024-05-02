const Sequelize = require("sequelize");

module.exports = function (sequelize) {
  return sequelize.define(
    "Leaderboard",
    {
      id: {
        type: Sequelize.NUMBER,
        primaryKey: true,
      },
      user_name: {
        type: Sequelize.STRING,
      },
      user_amount: {
        type: Sequelize.STRING,
      },
      used_hints_quantity: {
        type: Sequelize.NUMBER,
      },
    },
    {
      timestapms: false,
      createdAt: false,
      updatedAt: false,
      tableName: "leaderboard",
    },
  );
};
