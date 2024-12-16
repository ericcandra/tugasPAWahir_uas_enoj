var express = require("express");
var router = express.Router();

const bukuController = require ("../controllers/bukuController");

router.get("/", bukuController.index);

router.post("/store", bukuController.store);



module.exports = router;