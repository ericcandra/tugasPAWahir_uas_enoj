var express = require("express");
var router = express.Router();

const anggotaController = require ("../controllers/anggotaController");

router.get("/", anggotaController.index);

router.post("/store", anggotaController.store);

router.post("/update", anggotaController.update);

router.get("/delete/:id", anggotaController.deleteAnggota);

module.exports = router;