const express = require("express");

const router = express.Router();

const anggotaController = require("../controllers/anggotaController");

// Mengimpor middleware untuk autentikasi dan pengecekan peran
// const authMiddleware = require("../middleware/authmiddleware");
// const roleMiddleware = require("../middleware/roleMiddleware");
const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

// Definisi rute untuk anggota
// Mengatur rute GET untuk mendapatkan semua data fakultas
router.get("/", anggotaController.getAllAnggota);
// Mengatur rute POST untuk membuat data fakultas baru
router.post("/", authMiddleware, roleMiddleware("admin"), anggotaController.createAnggota);
// Mengatur rute GET untuk mendapatkan data fakultas berdasarkan ID
router.get("/:id", anggotaController.getAnggotaById);
// Mengatur rute PUT untuk memperbarui data fakultas berdasarkan ID
router.put("/:id", authMiddleware, roleMiddleware("admin"), anggotaController.updateAnggota);
// Mengatur rute DELETE untuk menghapus data fakultas berdasarkan ID
router.delete("/:id", authMiddleware, roleMiddleware("admin"), anggotaController.deleteAnggota);


// router.get("/", fakultasController.getAllFakultas);

// router.post("/", fakultasController.createFakultas);

// router.get("/:id", fakultasController.getFakultasById);

// router.put("/:id", fakultasController.updateFakultas);

// router.delete("/:id", fakultasController.deleteFakultas);

module.exports = router;