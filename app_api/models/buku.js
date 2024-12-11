// model fakultas
// mengimpor modul mongoose untuk mengelola koneksi dengan mongodb
const mongoose = require("mongoose");

// definisakn schema untuk fakultas
const bukuSchema = new mongoose.Schema({
    // field untuk nama buku
    nama: {
        type: String,
        required: true,
        trim: true,
    },
    penulis: {
        type: String,
        required: true,
        trim: true,
    },
    tahun: {
        type: String,
        required: true,
        trim: true,
    },
    // field untuk singkatan fakultas
    jenis: {
        type: String,
        required: true,
        trim: true,
    },
    // field untuk menyimpan tanggal pembuatan data fakultas
    createdAt: {
        type: Date,
        default: Date.now,
    },

});

// buat modul fakultas dari skema yang telah didefinisikan
const Buku = mongoose.model("Buku", bukuSchema);

module.exports = Buku;