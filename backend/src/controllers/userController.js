const bcrypt = require("bcryptjs");
const User = require("../models/userModel");

exports.createUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    const cekEmail = await User.findOne({ where: { email } });
    if (cekEmail) {
      return res.status(400).json({
        message: "Email sudah digunakan oleh user lain",
      });
    }

    const users = await User.findAll({
      attributes: ["password"],
    });

    for (const u of users) {
      const cekPasswordSama = await bcrypt.compare(password, u.password);
      if (cekPasswordSama) {
        return res.status(400).json({
          message: "Password tidak boleh sama dengan user lain",
        });
      }
    }

    const hash = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hash,
      role,
    });

    res.status(201).json({
      message: "User berhasil dibuat",
      data: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    res.status(500).json({
      message: "Gagal membuat user",
      error: err.message,
    });
  }
};


exports.getUsers = async (_req, res) => {
  try {
    const users = await User.findAll({
      attributes: ["id", "name", "email", "role"],
    });

    res.status(200).json({
      message:"Berhasil ambil data user",
      data: users,
    });
  } catch (err) {
    res.status(500).json({
      message: "Gagal mengambil user",
      error: err.message,
    });
  }
};
