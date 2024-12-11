const Buku = require("../models/buku");


const getAllBuku = async (req, res) =>{
    try {
        // mengambil semua fakultas dari database
        const buku = await Buku.find();
        // mengirim respon dengan status 200 dan data fakultas
        res.status(200).json(buku);
    }catch (err) {
        // mengirim respon dengan status 500 jika terjadi kesalahan
        res.status(500).json({ message: err.message });
    }
};

const getBukuById = async (req, res) => {
    try {
        // mencari fakultas berdasarkan id yang diberikan di parameter
        const buku = await Buku.findById(req.params.id);
        // jika fakultas tidak ditemukan, kirimkan respon 404
        if (!buku)
            return res.status(404).json({ message: "Buku not found" });
        // mengirim respon dengan status 200 dan data fakultas
        res.status(200).json(buku);
    }catch (err) {
        // mengirim respon dengan status 500 jika terjadi kesalahan
        res.status(500).json({ message: err.message });
    }
};

const createBuku = async (req, res) => {
    // membuat instance fakultas baru dari data yang diterima
    const buku = new Buku({
        nama: req.body.nama,
        penulis: req.body.penulis,
        tahun: req.body.tahun,
        jenis: req.body.jenis,
    });

    try {
        // menyimpan fakultas baru ke database
        const newBuku = await buku.save();
        // mengirim respon dengan status 201 dan data fakultas baru
        res.status(201).json(newBuku);
    }catch (err) {
        // mengirim respon dengan status 400 jika ada kesalahan saat menyimpan
        res.status(400).json({ message: err.message })
    }
};

const updateBuku = async (req, res) => {
    try {
        // mencari fakultas berdasarkan id yang diberikan di parameter
        const buku = await Buku.findById(req.params.id);
        // jika fakultas tidak ditemukan, kirimkan respon 404
        if (!buku)
            return res.status(404).json({ message: "Buku not found" });
        // memperbarui nama fakultas jika ada di request body
        if (req.body.nama != null) {
            buku.nama = req.body.nama;
        }

        // memperbarui singkatan fakultas jika ada di rquest body
        if (req.body.penulis != null) {
            buku.penulis = req.body.penulis;
        }
        if (req.body.tahun != null) {
            buku.tahun = req.body.tahun;
        }
        if (req.body.jenis != null) {
            buku.jenis = req.body.jenis;
        }

        // menyimpan perubahan ke database
        const updateBuku = await buku.save();
        // mengirimkan respons dengan status 200 dan data fakultas yang di perbarui
        res.status(200).json(updateBuku);
    }catch (err) {
        // mengirimkan respon dengan status 400 jika ada kesalahan saat memperbarui
        res.status(400).json({ message: err.message });
    }
};

const deleteBuku = async (req, res) => {
    try {
        const buku = await Buku.findById(req.params.id);
        // jika fakultas tidak ditemukan, kirimkan respon 404
        if (!buku)
            return res.status(404).json({ message: "Buku not found" });

        // menghapus fakultas dari database
        await buku.deleteOne();
        // mengirimkan respon dengan status 200 dan pesan penghapusan
        res.status(200).json({ message: "Buku deleted"});
    }catch (err) {
        // mengirimkan respon dengan status 500 jika terjadi kesalahan
        res.status(500).json({ message: err.message });
    }
};

module.exports = {getAllBuku,createBuku,getBukuById,updateBuku,deleteBuku};
