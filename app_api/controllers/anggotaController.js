const Anggota = require("../models/anggota");
const Buku = require("../models/buku");
// const path = require("path"); 
// const fs = require("fs");

// Fungsi untuk menambahkan data mahasiswa baru
exports.createAnggota = async (req, res) => {
    const { npm, nama, buku_id } = req.body; // Destrukturisasi data dari body request
  
    // if (!req.file) {
      // Validasi jika file foto tidak ada
    //   return res.status(400).json({ message: "File foto is required" });
    // }
  
    try {
      const buku = await Buku.findById(buku_id); // Mencari Prodi berdasarkan ID
      if (!buku) return res.status(404).json({ message: "Buku not found" }); // Jika Prodi tidak ditemukan
  
      // Membuat instance Mahasiswa baru
      const anggota = new Anggota({
        nama,
        npm,
        buku_id,
        // foto: req.file ? req.file.path : null, // Simpan path file jika ada
      });
  
      await anggota.save(); // Menyimpan data mahasiswa ke database
      res.status(201).json(anggota); // Mengembalikan respon sukses
    } catch (error) {
      res.status(500).json({ message: error.message }); // Menangani error
    }
  };
  
  // Fungsi untuk mendapatkan semua data mahasiswa
  exports.getAllAnggota = async (req, res) => {
    try {
      const anggota = await Anggota.find().populate("buku_id", "nama"); // Mengambil data mahasiswa dan relasi Prodi
      res.json(anggota); // Mengembalikan data mahasiswa
    } catch (error) {
      res.status(500).json({ message: error.message }); // Menangani error
    }
  };
  
  // Fungsi untuk mendapatkan data mahasiswa berdasarkan ID
  exports.getAnggotaById = async (req, res) => {
    try {
      const anggota = await Anggota.findById(req.params.id).populate(
        "buku_id",
        "nama"
      ); // Mengambil data mahasiswa berdasarkan ID dan relasi Prodi
      if (!anggota)
        return res.status(404).json({ message: "Anggota not found" }); // Jika mahasiswa tidak ditemukan
      res.json(anggota); // Mengembalikan data mahasiswa
    } catch (error) {
      res.status(500).json({ message: error.message }); // Menangani error
    }
  };
  
  // Fungsi untuk memperbarui data mahasiswa
  exports.updateAnggota = async (req, res) => {
    const { nama, npm, buku_id} = req.body; // Destrukturisasi data dari body request
  
    try {
      const anggota = await Anggota.findById(req.params.id); // Mencari mahasiswa berdasarkan ID
      if (!anggota)
        return res.status(404).json({ message: "Anggota not found" }); // Jika mahasiswa tidak ditemukan
  
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
    //   mahasiswa.jenis_kelamin = jenis_kelamin ?? mahasiswa.jenis_kelamin;
    //   mahasiswa.asal_sekolah = asal_sekolah ?? mahasiswa.asal_sekolah;
  
      await anggota.save(); // Menyimpan data mahasiswa yang diperbarui ke database
      res.json(anggota); // Mengembalikan data mahasiswa yang diperbarui
    } catch (error) {
      res.status(500).json({ message: error.message }); // Menangani error
    }
  };
  
  // Fungsi untuk menghapus data mahasiswa
  exports.deleteAnggota= async (req, res) => {
    try {
      const anggota = await Anggota.findByIdAndDelete(req.params.id); // Menghapus mahasiswa berdasarkan ID
      if (!anggota)
        return res.status(404).json({ message: "Anggota not found" }); // Jika mahasiswa tidak ditemukan
  
    //   if (mahasiswa.foto) {
        // Jika ada file foto, hapus file tersebut
    //     fs.unlinkSync(path.join(__dirname, "../", mahasiswa.foto));
    //   }
  
      res.json({ message: "Anggota deleted successfully" }); // Mengembalikan respon sukses
    } catch (error) {
      res.status(500).json({ message: error.message }); // Menangani error
    }
  };