var express = require("express");
var router = express.Router();

const bukuController = require ("../controllers/bukuController");

router.get("/", bukuController.index);

router.post("/store", bukuController.store);

router.post("/update/:id", bukuController.update);


module.exports = router;