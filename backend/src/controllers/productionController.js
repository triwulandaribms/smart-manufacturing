const ProductionLog = require("../models/productionLogModels");
const Machine = require("../models/machineModel");
const User = require("../models/userModel");

exports.createProductionLog = async (req, res) => {

  try {
    const { machine_id, quantity, shift } = req.body;

    if (!machine_id || quantity == null || !shift) {
      return res.status(400).json({
        message: "machine_id, quantity, dan shift wajib diisi",
      });
    }

    if (typeof quantity !== "number" || quantity <= 0) {
      return res.status(400).json({
        message: "Quantity harus berupa angka dan lebih dari 0",
      });
    }

    const machine = await Machine.findByPk(machine_id);

    if (!machine) {
      return res.status(404).json({
        message: "Mesin tidak ditemukan",
      });
    }

    const blockedStatus = ["MAINTENANCE", "ERROR"];
    if (blockedStatus.includes(machine.status.toUpperCase())) {
      return res.status(400).json({
        message: `Mesin tidak bisa digunakan karena status ${machine.status}`,
      });
    }

    const newLog = await ProductionLog.create({
      machine_id,
      quantity,
      shift,
      operator_id: req.user.id,
    });

    const log = await ProductionLog.findByPk(newLog.id, {
      attributes: ["id", "quantity", "shift", "createdAt"],
      include: [
        {
          model: Machine,
          as: "machine",
          attributes: ["id", "name", "type", "status"],
        },
        {
          model: User,
          as: "operator",
          attributes: ["id", "name", "email"],
        },
      ],
    });

    return res.status(201).json({
      message: "Data produksi berhasil dicatat",
      data: log,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Gagal mencatat produksi",
      error: err.message,
    });
  }

};


exports.getProductionLogs = async (_req, res) => {

  try {
    const logs = await ProductionLog.findAll({
      attributes: ["id", "quantity", "shift", "createdAt"],
      include: [
        {
          model: Machine,
          as: "machine",
          attributes: ["id", "name", "type", "status"],
        },
        {
          model: User,
          as: "operator",
          attributes: ["id", "name", "email"],
        },
      ],
      order: [["createdAt", "DESC"]],
    });

    return res.status(200).json({
      message: "Berhasil mengambil data produksi",
      data: logs,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Gagal mengambil data produksi",
      error: err.message,
    });
  }

};


exports.dashboardSummary = async (_req, res) => {

  try {
    const logs = await ProductionLog.findAll({
      attributes: ["quantity"],
      include: [
        {
          model: Machine,
          as: "machine",
          attributes: ["id", "name", "type", "status"],
        },
      ],
    });

    const summaryMap = {};

    logs.forEach((log) => {
      if (!log.machine) return;

      const { id, name, status } = log.machine;

      if (!summaryMap[id]) {
        summaryMap[id] = {
          machine_id: id,
          machine_name: name,
          status,
          totalProduction: 0,
        };
      }

      summaryMap[id].totalProduction += log.quantity;
    });

    return res.status(200).json({
      message: "Berhasil mengambil dashboard produksi",
      data: Object.values(summaryMap),
    });
  } catch (err) {
    return res.status(500).json({
      message: "Gagal mengambil dashboard",
      error: err.message,
    });
  }

};


