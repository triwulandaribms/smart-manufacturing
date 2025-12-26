const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");

const Machine = sequelize.define(
  "Machine",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },

    type: {
      type: DataTypes.ENUM("CNC", "Milling", "Press", "Assembly"),
      allowNull: false,
    },

    status: {
      type: DataTypes.ENUM("Running", "Idle", "Maintenance", "Error"),
      allowNull: false,
      defaultValue: "Idle",
    },

    temperature: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },

    deletedAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    tableName: "machines",
    timestamps: true,
    paranoid: true,
    deletedAt: "deletedAt",
  }
);

module.exports = Machine;
