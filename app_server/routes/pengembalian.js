var express = require("express");
var router = express.Router();

const pengembalianController = require ("../controllers/pengembalianController");

router.get("/", pengembalianController.index);

router.post("/store", pengembalianController.store);

module.exports = router;