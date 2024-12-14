const Pengembalian = require("../models/pengembalian");
const Buku = require("../models/buku");
const Anggota = require("../models/anggota");
const Denda = require("../models/denda");
// const path = require("path"); 
// const fs = require("fs");

// Fungsi untuk menambahkan data mahasiswa baru
exports.createPengembalian = async (req, res) => {
    const { buku_id, anggota_id, denda_id } = req.body; // Destrukturisasi data dari body request
  
    // if (!req.file) {
      // Validasi jika file foto tidak ada
    //   return res.status(400).json({ message: "File foto is required" });
    // }
    try {
      const buku = await Buku.findById(buku_id); // Mencari Prodi berdasarkan ID
      if (!buku) return res.status(404).json({ message: "Buku not found" });
      const anggota = await Anggota.findById(anggota_id);
      if (!anggota) return res.status(404).json({ message: "Anggota not found" }); // Jika Prodi tidak ditemukan
      const denda = await Denda.findById(denda_id);
      if (!denda) return res.status(404).json({ message: "Denda not found" }); // Jika Prodi tidak ditemukan
      
      // Membuat instance Mahasiswa baru
      const pengembalian = new Pengembalian({
        buku_id,
        anggota_id,
        denda_id
    
        // foto: req.file ? req.file.path : null, // Simpan path file jika ada
      });
  
      await pengembalian.save(); // Menyimpan data mahasiswa ke database
      res.status(201).json(pengembalian); // Mengembalikan respon sukses
    } catch (error) {
      res.status(500).json({ message: error.message }); // Menangani error
    } 
  
};
  
  // Fungsi untuk mendapatkan semua data mahasiswa
  exports.getAllPengembalian = async (req, res) => {
    try {
      const pengembalian = await Pengembalian.find().populate("buku_id", "nama").populate("anggota_id", "nama").populate("denda_id", "jumlahPinjam"); // Mengambil data mahasiswa dan relasi Prodi
      res.json(pengembalian); // Mengembalikan data denda
    } catch (error) {
      res.status(500).json({ message: error.message }); // Menangani error
    }
  };
  
  // Fungsi untuk mendapatkan data mahasiswa berdasarkan ID
  exports.getPengembalianById = async (req, res) => {
    try {
      const pengembalian = await Pengembalian.findById(req.params.id).populate(
        "buku_id",
        "nama"
      ).populate("anggota_id", "nama").populate("denda_id", "jumlahPinjam"); // Mengambil data mahasiswa berdasarkan ID dan relasi Prodi
      if (!pengembalian)
        return res.status(404).json({ message: "Pengembalian not found" }); // Jika mahasiswa tidak ditemukan
      res.json(pengembalian); // Mengembalikan data mahasiswa
    } catch (error) {
      res.status(500).json({ message: error.message }); // Menangani error
    }
  };
  
  // Fungsi untuk memperbarui data mahasiswa
  exports.updatePengembalian = async (req, res) => {
    const { buku_id, anggota_id, denda_id} = req.body; // Destrukturisasi data dari body request
  
    try {
      const pengembalian = await Pengembalian.findById(req.params.id); // Mencari mahasiswa berdasarkan ID
      if (!pengembalian)
        return res.status(404).json({ message: "Pengembalian not found" }); // Jika mahasiswa tidak ditemukan
  
      // if (req.file) {
      //   // Jika ada file foto baru
      //   if (mahasiswa.foto) {
      //     // Hapus foto lama jika ada
      //     fs.unlinkSync(path.join(__dirname, "../", mahasiswa.foto));
      //   }
      //   mahasiswa.foto = req.file.path; // Simpan path file baru
      // }
  
      // Perbarui field mahasiswa
      pengembalian.buku_id = buku_id ?? pengembalian.buku_id;
      pengembalian.anggota_id = anggota_id ?? pengembalian.anggota_id;
      pengembalian.denda_id = denda_id ?? pengembalian.denda_id;
      

    //   mahasiswa.jenis_kelamin = jenis_kelamin ?? mahasiswa.jenis_kelamin;
    //   mahasiswa.asal_sekolah = asal_sekolah ?? mahasiswa.asal_sekolah;
  
      await pengembalian.save(); // Menyimpan data mahasiswa yang diperbarui ke database
      res.json(pengembalian); // Mengembalikan data mahasiswa yang diperbarui
    } catch (error) {
      res.status(500).json({ message: error.message }); // Menangani error
    }
  };
  
  // Fungsi untuk menghapus data mahasiswa
  exports.deletePengembalian= async (req, res) => {
    try {
      const pengembalian = await Pengembalian.findByIdAndDelete(req.params.id); // Menghapus mahasiswa berdasarkan ID
      if (!pengembalian)
        return res.status(404).json({ message: "Pengembalian not found" }); // Jika mahasiswa tidak ditemukan
  
    //   if (mahasiswa.foto) {
        // Jika ada file foto, hapus file tersebut
    //     fs.unlinkSync(path.join(__dirname, "../", mahasiswa.foto));
    //   }
  
      res.json({ message: "Pengembalian deleted successfully" }); // Mengembalikan respon sukses
    } catch (error) {
      res.status(500).json({ message: error.message }); // Menangani error
    }
};