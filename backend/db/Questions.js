const Sequelize = require("sequelize");

module.exports = function (sequelize) {
  return sequelize.define(
    "Questions",
    {
      text: {
        type: Sequelize.STRING,
      },
      answer1: {
        type: Sequelize.STRING,
      },
      answer2: {
        type: Sequelize.STRING,
      },
      answer3: {
        type: Sequelize.STRING,
      },
      answer4: {
        type: Sequelize.STRING,
      },
      correct_answer: {
        type: Sequelize.NUMBER,
      },
      difficulty: {
        type: Sequelize.NUMBER,
      },
    },
    {
      timestapms: false,
      createdAt: false,
      updatedAt: false,
      tableName: "questions",
    },
  );
};
