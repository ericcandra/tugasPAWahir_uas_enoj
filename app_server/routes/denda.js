var express = require("express");
var router = express.Router();

const dendaController = require ("../controllers/dendaController");

router.get("/", dendaController.index);

router.post("/store", dendaController.store);

module.exports = router;