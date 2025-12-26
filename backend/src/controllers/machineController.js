const Machine = require("../models/machineModel");

exports.getMachines = async (_req, res) => {

  try {
    const machines = await Machine.findAll({
      attributes: ["id", "name", "type", "status", "temperature"],
    });

    res.status(200).json({
      message:"Berhasil ambil data machine",
      data: machines,
    });
  } catch (err) {
    res.status(500).json({
      message: "Gagal mengambil data mesin",
      error: err.message,
    });
  }

};


exports.createMachine = async (req, res) => {

  try {
    const { name, type, status, temperature } = req.body;

    const machine = await Machine.create({
      name,
      type,
      status,
      temperature,
    });

    res.status(201).json({
      message: "Mesin berhasil ditambahkan",
      data: {
        id: machine.id,
        name: machine.name,
        type: machine.type,
        status: machine.status,
        temperature: machine.temperature,
      },
    });
  } catch (err) {
    res.status(500).json({
      message: "Gagal menambahkan mesin",
      error: err.message,
    });
  }

};


exports.updateMachineStatus = async (req, res) => {

  try {
    const { id } = req.params;
    const { status, temperature } = req.body;

    const machine = await Machine.findByPk(id);

    if (!machine) {
      return res.status(404).json({
        message: "Mesin tidak ditemukan",
      });
    }

    await machine.update({ status, temperature });

    res.status(201).json({
      message: "Status mesin berhasil diupdate",
      data: {
        id: machine.id,
        name: machine.name,
        type: machine.type,
        status: machine.status,
        temperature: machine.temperature,
      },
    });
  } catch (err) {
    res.status(500).json({
      message: "Gagal update mesin",
      error: err.message,
    });
  }

};
