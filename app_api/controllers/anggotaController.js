const Anggota = require("../models/anggota");


const getAllAnggota = async (req, res) =>{
    try {
        // mengambil semua buku dari database
        const anggota = await Anggota.find().populate("buku_id", "nama penulis tahun jenis");
        // mengirim respon dengan status 200 dan data buku
        res.status(200).json(anggota);
    }catch (err) {
        // mengirim respon dengan status 500 jika terjadi kesalahan
        res.status(500).json({ message: err.message });
    }
};

const getAnggotaById = async (req, res) => {
    try {
        // mencari buku berdasarkan id yang diberikan di parameter
        const anggota = await Anggota.findById(req.params.id);
        // jika fakultas tidak ditemukan, kirimkan respon 404
        if (!anggota)
            return res.status(404).json({ message: "Anggota not found" });
        // mengirim respon dengan status 200 dan data buku
        res.status(200).json(anggota);
    }catch (err) {
        // mengirim respon dengan status 500 jika terjadi kesalahan
        res.status(500).json({ message: err.message });
    }
};

const createAnggota = async (req, res) => {
    // membuat instance fakultas baru dari data yang diterima
    const anggota = new Anggota({
        nama: req.body.nama,
        npm: req.body.npm,
        buku_id: req.body.buku_id,
    });

    try {
        // menyimpan fakultas baru ke database
        const newAnggota = await anggota.save();
        // mengirim respon dengan status 201 dan data fakultas baru
        res.status(201).json(newAnggota);
    }catch (err) {
        // mengirim respon dengan status 400 jika ada kesalahan saat menyimpan
        res.status(400).json({ message: err.message })
    }
};

const updateAnggota = async (req, res) => {
    const { nama, npm, buku_id,  } = req.body;
    try {
        const anggota = await Anggota.findById(req.params.id); // Mencari mahasiswa berdasarkan ID
        if (!anggota)
          return res.status(404).json({ message: "anggota not found" }); // Jika mahasiswa tidak ditemukan
    
        // if (req.file) {
        //   // Jika ada file foto baru
        //   if (mahasiswa.foto) {
        //     // Hapus foto lama jika ada
        //     fs.unlinkSync(path.join(__dirname, "../", mahasiswa.foto));
        //   }
        //   mahasiswa.foto = req.file.path; // Simpan path file baru
        // }
    
        // Perbarui field mahasiswa
        anggota.nama = nama ?? anggota.nama;
        anggota.npm = npm ?? anggota.npm;
        anggota.buku_id = buku_id ?? anggota.buku_id;
        // mahasiswa.npm = npm ?? mahasiswa.npm;
        // mahasiswa.nama = nama ?? mahasiswa.nama;
        // mahasiswa.prodi_id = prodi_id ?? mahasiswa.prodi_id;
        // mahasiswa.jenis_kelamin = jenis_kelamin ?? mahasiswa.jenis_kelamin;
        // mahasiswa.asal_sekolah = asal_sekolah ?? mahasiswa.asal_sekolah;
    
        await anggota.save(); // Menyimpan data mahasiswa yang diperbarui ke database
        res.json(anggota); // Mengembalikan data mahasiswa yang diperbarui
      } catch (error) {
        res.status(500).json({ message: error.message }); // Menangani error
      }
    };
    

const deleteAnggota = async (req, res) => {
    try {
        const anggota = await Anggota.findById(req.params.id);
        // jika fakultas tidak ditemukan, kirimkan respon 404
        if (!anggota)
            return res.status(404).json({ message: "Anggota not found" });

        // menghapus fakultas dari database
        await anggota.deleteOne();
        // mengirimkan respon dengan status 200 dan pesan penghapusan
        res.status(200).json({ message: "Anggota deleted"});
    }catch (err) {
        // mengirimkan respon dengan status 500 jika terjadi kesalahan
        res.status(500).json({ message: err.message });
    }
};

module.exports = {getAllAnggota,createAnggota,getAnggotaById,updateAnggota,deleteAnggota};