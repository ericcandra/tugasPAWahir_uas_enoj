var express = require("express");
var router = express.Router();

const anggotaController = require ("../controllers/anggotaController");

router.get("/", anggotaController.index);

router.post("/store", anggotaController.store);

module.exports = router;