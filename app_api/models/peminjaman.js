// model fakultas
// mengimpor modul mongoose untuk mengelola koneksi dengan mongodb
const mongoose = require("mongoose");

// definisakn schema untuk fakultas
const peminjamanSchema = new mongoose.Schema({
    // field untuk nama buku
    tanggalPinjam: {
        type: String,
        required: true,
        trim: true,
    },
    tanggalKembali: {
        type: String,
        required: true,
        trim: true,
    },
    batasPinjam: {
        type: String,
        required: true,
        trim: true,
    },
    // field untuk singkatan fakultas
    buku_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Buku",
        required: true,
    },
    // field untuk menyimpan tanggal pembuatan data fakultas
    createdAt: {
        type: Date,
        default: Date.now,
    },

});

// buat modul fakultas dari skema yang telah didefinisikan
const Peminjaman = mongoose.model("Peminjaman", peminjamanSchema);

module.exports = Peminjaman;