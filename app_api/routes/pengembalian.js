const express = require("express");

const router = express.Router();

const pengembalianController = require("../controllers/pengembalianController");

// Mengimpor middleware untuk autentikasi dan pengecekan peran
// const authMiddleware = require("../middleware/authmiddleware");
// const roleMiddleware = require("../middleware/roleMiddleware");
const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

// Definisi rute untuk anggota
// Mengatur rute GET untuk mendapatkan semua data fakultas
router.get("/", pengembalianController.getAllPengembalian);
// Mengatur rute POST untuk membuat data fakultas baru
router.post("/", authMiddleware, roleMiddleware("admin"), pengembalianController.createPengembalian);
// Mengatur rute GET untuk mendapatkan data fakultas berdasarkan ID
router.get("/:id", pengembalianController.getPengembalianById);
// Mengatur rute PUT untuk memperbarui data fakultas berdasarkan ID
router.put("/:id", authMiddleware, roleMiddleware("admin"), pengembalianController.updatePengembalian);
// Mengatur rute DELETE untuk menghapus data fakultas berdasarkan ID
router.delete("/:id", authMiddleware, roleMiddleware("admin"), pengembalianController.deletePengembalian);


// router.get("/", fakultasController.getAllFakultas);

// router.post("/", fakultasController.createFakultas);

// router.get("/:id", fakultasController.getFakultasById);

// router.put("/:id", fakultasController.updateFakultas);

// router.delete("/:id", fakultasController.deleteFakultas);

module.exports = router;