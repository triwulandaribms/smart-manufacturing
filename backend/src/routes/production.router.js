const express = require("express");
const router = express.Router();
const productionController = require("../controllers/productionController");

router.post("/add", productionController.createProductionLog);
router.get("/get-all", productionController.getProductionLogs);
router.get("/dashboard", productionController.dashboardSummary);

module.exports = router;
