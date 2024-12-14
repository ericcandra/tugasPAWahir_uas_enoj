// model fakultas
// mengimpor modul mongoose untuk mengelola koneksi dengan mongodb
const mongoose = require("mongoose");

// definisakn schema untuk fakultas
const dendaSchema = new mongoose.Schema({
    // field untuk nama buku
    jumlahPinjam: {
        type: String,
        required: true,
        trim: true,
    },
    // field untuk buku
    buku_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Buku",
        required: true,
    },
    anggota_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Anggota",
        required: true,
    },
    harga: {
        type: String,
        required: true,
        trim: true,
    },
    // field untuk menyimpan tanggal pembuatan data fakultas  

},
{ timestamps: true}
);

// buat modul fakultas dari skema yang telah didefinisikan
const Denda = mongoose.model("Denda", dendaSchema);

module.exports = Denda;