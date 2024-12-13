// model fakultas
// mengimpor modul mongoose untuk mengelola koneksi dengan mongodb
const mongoose = require("mongoose");

// definisakn schema untuk fakultas
const anggotaSchema = new mongoose.Schema({
    // field untuk nama buku
    nama: {
        type: String,
        required: true,
        trim: true,
    },
    npm: {
        type: String,
        required: true,
        unique: true,
    },
    // field untuk buku
    buku_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Buku",
        required: true,
    },
    // field untuk menyimpan tanggal pembuatan data fakultas
    

},
{ timestamps: true}
);

// buat modul fakultas dari skema yang telah didefinisikan
const Anggota = mongoose.model("Anggota", anggotaSchema);

module.exports = Anggota;