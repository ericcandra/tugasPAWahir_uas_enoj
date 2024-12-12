const Peminjaman = require("../models/peminjaman");


const getAllPeminjaman = async (req, res) =>{
    try {
        // mengambil semua buku dari database
        const peminjaman = await Peminjaman.find().populate("buku_id", "nama penulis tahun jenis");
        // mengirim respon dengan status 200 dan data buku
        res.status(200).json(peminjaman);
    }catch (err) {
        // mengirim respon dengan status 500 jika terjadi kesalahan
        res.status(500).json({ message: err.message });
    }
};

const getPeminjamanById = async (req, res) => {
    try {
        // mencari buku berdasarkan id yang diberikan di parameter
        const peminjaman = await Peminjaman.findById(req.params.id);
        // jika fakultas tidak ditemukan, kirimkan respon 404
        if (!peminjaman)
            return res.status(404).json({ message: "Peminjaman not found" });
        // mengirim respon dengan status 200 dan data buku
        res.status(200).json(peminjaman);
    }catch (err) {
        // mengirim respon dengan status 500 jika terjadi kesalahan
        res.status(500).json({ message: err.message });
    }
};

const createPeminjaman = async (req, res) => {
    // membuat instance fakultas baru dari data yang diterima
    const peminjaman = new Peminjaman({
        tanggalPinjam: req.body.tanggalPinjam,
        tanggalKembali: req.body.tanggalKembali,
        batasPinjam: req.body.batasPinjam,
        buku_id: req.body.buku_id,
    });

    try {
        // menyimpan fakultas baru ke database
        const newPeminjaman = await peminjaman.save();
        // mengirim respon dengan status 201 dan data fakultas baru
        res.status(201).json(newPeminjaman);
    }catch (err) {
        // mengirim respon dengan status 400 jika ada kesalahan saat menyimpan
        res.status(400).json({ message: err.message })
    }
};

const updatePeminjaman = async (req, res) => {
    const { tanggalPinjam, tanggalKembali, batasPinjam, buku_id,  } = req.body;
    try {
        const peminjaman = await Peminjaman.findById(req.params.id); // Mencari mahasiswa berdasarkan ID
        if (!peminjaman)
          return res.status(404).json({ message: "peminjaman not found" }); // Jika mahasiswa tidak ditemukan
    
        // if (req.file) {
        //   // Jika ada file foto baru
        //   if (mahasiswa.foto) {
        //     // Hapus foto lama jika ada
        //     fs.unlinkSync(path.join(__dirname, "../", mahasiswa.foto));
        //   }
        //   mahasiswa.foto = req.file.path; // Simpan path file baru
        // }
    
        // Perbarui field mahasiswa
        peminjaman.tanggalPinjam = tanggalPinjam ?? peminjaman.tanggalPinjam;
        peminjaman.tanggalKembali = tanggalKembali ?? peminjaman.tanggalKembali;
        peminjaman.batasPinjam = batasPinjam ?? peminjaman.batasPinjam;
        peminjaman.buku_id = buku_id ?? peminjaman.buku_id;
        // mahasiswa.npm = npm ?? mahasiswa.npm;
        // mahasiswa.nama = nama ?? mahasiswa.nama;
        // mahasiswa.prodi_id = prodi_id ?? mahasiswa.prodi_id;
        // mahasiswa.jenis_kelamin = jenis_kelamin ?? mahasiswa.jenis_kelamin;
        // mahasiswa.asal_sekolah = asal_sekolah ?? mahasiswa.asal_sekolah;
    
        await peminjaman.save(); // Menyimpan data mahasiswa yang diperbarui ke database
        res.json(peminjaman); // Mengembalikan data mahasiswa yang diperbarui
      } catch (error) {
        res.status(500).json({ message: error.message }); // Menangani error
      }
    };
    

const deletePeminjaman = async (req, res) => {
    try {
        const peminjaman = await Peminjaman.findById(req.params.id);
        // jika fakultas tidak ditemukan, kirimkan respon 404
        if (!peminjaman)
            return res.status(404).json({ message: "Peminjaman not found" });

        // menghapus fakultas dari database
        await peminjaman.deleteOne();
        // mengirimkan respon dengan status 200 dan pesan penghapusan
        res.status(200).json({ message: "Peminjaman deleted"});
    }catch (err) {
        // mengirimkan respon dengan status 500 jika terjadi kesalahan
        res.status(500).json({ message: err.message });
    }
};

module.exports = {getAllPeminjaman,createPeminjaman,getPeminjamanById,updatePeminjaman,deletePeminjaman};