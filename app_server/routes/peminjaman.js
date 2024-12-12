var express = require("express");
var router = express.Router();

const peminjamanController = require ("../controllers/peminjamanController");

router.get("/", peminjamanController.index);

router.post("/store", peminjamanController.store);

module.exports = router;