const Denda = require("../models/denda");
const Anggota = require("../models/anggota");
const Buku = require("../models/buku");
// const path = require("path"); 
// const fs = require("fs");

// Fungsi untuk menambahkan data mahasiswa baru
exports.createDenda = async (req, res) => {
    const { jumlahPinjam, buku_id, anggota_id, harga } = req.body; // Destrukturisasi data dari body request
  
    // if (!req.file) {
      // Validasi jika file foto tidak ada
    //   return res.status(400).json({ message: "File foto is required" });
    // }
    try {
      const buku = await Buku.findById(buku_id); // Mencari Prodi berdasarkan ID
      if (!buku) return res.status(404).json({ message: "Buku not found" });
      const anggota = await Anggota.findById(anggota_id);
      if (!anggota) return res.status(404).json({ message: "Anggota not found" }); // Jika Prodi tidak ditemukan
  
      // Membuat instance Mahasiswa baru
      const denda = new Denda({
        jumlahPinjam,
        buku_id,
        anggota_id,
        harga
    
        // foto: req.file ? req.file.path : null, // Simpan path file jika ada
      });
  
      await denda.save(); // Menyimpan data mahasiswa ke database
      res.status(201).json(denda); // Mengembalikan respon sukses
    } catch (error) {
      res.status(500).json({ message: error.message }); // Menangani error
    } 
  
};
  
  // Fungsi untuk mendapatkan semua data mahasiswa
  exports.getAllDenda = async (req, res) => {
    try {
      const denda = await Denda.find().populate("buku_id", "nama").populate("anggota_id", "nama"); // Mengambil data mahasiswa dan relasi Prodi
      res.json(denda); // Mengembalikan data denda
    } catch (error) {
      res.status(500).json({ message: error.message }); // Menangani error
    }
  };
  
  // Fungsi untuk mendapatkan data mahasiswa berdasarkan ID
  exports.getDendaById = async (req, res) => {
    try {
      const denda = await Denda.findById(req.params.id).populate(
        "buku_id",
        "nama"
      ).populate("anggota_id", "nama"); // Mengambil data mahasiswa berdasarkan ID dan relasi Prodi
      if (!denda)
        return res.status(404).json({ message: "Denda not found" }); // Jika mahasiswa tidak ditemukan
      res.json(denda); // Mengembalikan data mahasiswa
    } catch (error) {
      res.status(500).json({ message: error.message }); // Menangani error
    }
  };
  
  // Fungsi untuk memperbarui data mahasiswa
  exports.updateDenda = async (req, res) => {
    const { jumlahPinjam, buku_id, anggota_id, harga} = req.body; // Destrukturisasi data dari body request
  
    try {
      const denda = await Denda.findById(req.params.id); // Mencari mahasiswa berdasarkan ID
      if (!denda)
        return res.status(404).json({ message: "Denda not found" }); // Jika mahasiswa tidak ditemukan
  
      // if (req.file) {
      //   // Jika ada file foto baru
      //   if (mahasiswa.foto) {
      //     // Hapus foto lama jika ada
      //     fs.unlinkSync(path.join(__dirname, "../", mahasiswa.foto));
      //   }
      //   mahasiswa.foto = req.file.path; // Simpan path file baru
      // }
  
      // Perbarui field mahasiswa
      denda.jumlahPinjam = jumlahPinjam ?? denda.jumlahPinjam;
      denda.buku_id = buku_id ?? denda.buku_id;
      denda.anggota_id = anggota_id ?? denda.anggota_id;
      denda.harga = harga ?? denda.harga;

    //   mahasiswa.jenis_kelamin = jenis_kelamin ?? mahasiswa.jenis_kelamin;
    //   mahasiswa.asal_sekolah = asal_sekolah ?? mahasiswa.asal_sekolah;
  
      await denda.save(); // Menyimpan data mahasiswa yang diperbarui ke database
      res.json(denda); // Mengembalikan data mahasiswa yang diperbarui
    } catch (error) {
      res.status(500).json({ message: error.message }); // Menangani error
    }
  };
  
  // Fungsi untuk menghapus data mahasiswa
  exports.deleteDenda= async (req, res) => {
    try {
      const denda = await Denda.findByIdAndDelete(req.params.id); // Menghapus mahasiswa berdasarkan ID
      if (!denda)
        return res.status(404).json({ message: "Denda not found" }); // Jika mahasiswa tidak ditemukan
  
    //   if (mahasiswa.foto) {
        // Jika ada file foto, hapus file tersebut
    //     fs.unlinkSync(path.join(__dirname, "../", mahasiswa.foto));
    //   }
  
      res.json({ message: "Denda deleted successfully" }); // Mengembalikan respon sukses
    } catch (error) {
      res.status(500).json({ message: error.message }); // Menangani error
    }
};