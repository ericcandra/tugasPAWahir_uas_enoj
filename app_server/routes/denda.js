var express = require("express");
var router = express.Router();

const dendaController = require ("../controllers/dendaController");
const { route } = require("./peminjaman");

router.get("/", dendaController.index);

router.post("/store", dendaController.store);

router.post("/update", dendaController.update);

router.get("/delete/:id", dendaController.deleteDenda);

module.exports = router;