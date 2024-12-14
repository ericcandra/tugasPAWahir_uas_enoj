const axios = require("axios");

const index = async (req, res) => {
    try {
        // Mendapatkan data buku dari API eksternal
        const response = await axios.get(
            "https://tugas-pa-wahir-uas-enoj.vercel.app/api/denda"
        );

        const anggotaResponse = await axios.get(
            "https://tugas-pa-wahir-uas-enoj.vercel.app/api/anggota"
        );
        const bukuResponse = await axios.get(
            "https://tugas-pa-wahir-uas-enoj.vercel.app/api/buku"
        );
        // Mendapatkan data buku dari API eksternal
        
        const denda = response.data;
        const anggotaList = anggotaResponse.data;
        const bukuList = bukuResponse.data;

        res.render("denda", {
            title: "Halaman Denda",
            denda, anggotaList, bukuList,
            layout: "main",
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Gagal mendapatkan data denda dari API");
    }
};

const store = async (req, res) => {
    const { jumlahPinjam, buku_id, anggota_id, harga } = req.body;
    try {
        const response = await axios.post(
            "https://tugas-pa-wahir-uas-enoj.vercel.app/api/denda",
            { jumlahPinjam, buku_id, anggota_id, harga }
        );

        if (response.status === 200 || response.status === 201) {
            res.redirect("/denda");
        } else {
            res.status(500).send("Gagal menambahkan data denda.");
        }
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Error menambahkan data denda.");
    }
};

module.exports = { index, store };


// const axios = require("axios");

// const index = async (req, res) => {
//     try {
//         // mendapatkan data buku dari API eksternal
//         const response = await axios.get(
//             "https://tugas-pa-wahir-uas-enoj.vercel.app/api/peminjaman"
//             // cloud mongodb peminjaman
//         );

//         const peminjaman = response.data;

//         res.render("peminjaman", {
//             title: "Halaman Peminjaman",
//             peminjaman,
//             layout: "main",
//         });
//     }catch (error)  {
//         console.error(error.mesage);
//         res.status(500).send("Gagal mendapatkan data peminjaman dari api");
//     }
// };

// const store = async (req, res) => {
//     const { tanggalPinjam, tanggalKembali, batasPinjam, buku_id } = req.body;
//     try {
//       const response = await fetch(
//             "https://tugas-pa-wahir-uas-enoj.vercel.app/api/peminjaman",
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({ tanggalPinjam, tanggalKembali, batasPinjam, buku_id }),
//         }
//       );
  
//       if (response.ok) {
//         res.redirect("/peminjaman"); // Redirect ke halaman buku setelah berhasil menambah
//       } else {
//         res.status(500).send("Gagal menambahkan data peminjaman.");
//       }
//     } catch (error) {
//       res.status(500).send("Error menambahkan data peminjaman");
//     }
//   };

// module.exports = {index, store};