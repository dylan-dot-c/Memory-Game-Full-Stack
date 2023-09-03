const { DataTypes } = require("sequelize");
// const { sequelize } = require(".");

module.exports = (sequelize, DataTypes) => {
  const score = sequelize.define("scores", {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
    },
    difficulty: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    flips: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    seconds: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });

  score.associate = (models) => {
    score.belongsTo(models.users, {
      foreignKey: {
        type: DataTypes.INTEGER,
      },
    });
  };

  return score;
};
