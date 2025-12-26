const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");
const Machine = require("./machineModel");
const User = require("./userModel");

const ProductionLog = sequelize.define(
  "ProductionLog",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    machine_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "machines",
        key: "id",
      },
    },

    operator_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "users",
        key: "id",
      },
    },

    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    shift: {
      type: DataTypes.ENUM("Pagi", "Siang", "Malam"),
      allowNull: false,
    },

    deletedAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    tableName: "production_logs",
    timestamps: true,
    paranoid: true,
    deletedAt: "deletedAt",
  }
);


Machine.hasMany(ProductionLog, {
  foreignKey: "machine_id",
  as: "productionLogs",
});

ProductionLog.belongsTo(Machine, {
  foreignKey: "machine_id",
  as: "machine",
});

User.hasMany(ProductionLog, {
  foreignKey: "operator_id",
  as: "productionLogs",
});

ProductionLog.belongsTo(User, {
  foreignKey: "operator_id",
  as: "operator",
});

module.exports = ProductionLog;
