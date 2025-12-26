require("dotenv").config();

const express = require("express");
const { sequelize } = require("./config/db.js");

const authRoutes = require("./routes/auth.router.js");
const userRoutes = require("./routes/user.router.js");
const machineRoutes = require("./routes/machine.router.js");
const productionRoutes = require("./routes/production.router.js");

const { authMiddleware } = require("./middleware/auth.js");

const app = express();

app.use(express.json());

app.use("/api/auth", authRoutes);

app.use("/api/users", authMiddleware, userRoutes);

app.use("/api/machines", authMiddleware, machineRoutes);
app.use("/api/production", authMiddleware, productionRoutes);

(async () => {
  try {
    await sequelize.authenticate();
    console.log("Terhubung ke database");

    await sequelize.sync({ alter: true });
    console.log("Berhasil sinkronisasi database");

    app.listen(3000, () => {
      console.log("Server berjalan di port 3000");
    });
  } catch (err) {
    console.error("Gagal menghubungkan database:", err.message);
  }
})();
