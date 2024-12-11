var express = require("express");
var router = express.Router();

// import controller
const mainController = require("../controllers/mainController");

//route
// router.get("/", mainController.use);

router.get("/", mainController.index);
router.get("/home", mainController.index);

// router.get('/about', mainController.about);
router.get("/about", mainController.about);

// router.get('/contact', mainController.contact);
router.get("/contact", mainController.contact);

module.exports = router;
