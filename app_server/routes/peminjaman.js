var express = require("express");
var router = express.Router();

const peminjamanController = require ("../controllers/peminjamanController");

router.get("/", peminjamanController.index);

router.post("/store", peminjamanController.store);

router.post("/update", peminjamanController.update);

router.get("/delete/:id", peminjamanController.deletePeminjaman);

module.exports = router;