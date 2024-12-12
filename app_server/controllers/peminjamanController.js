const axios = require("axios");

const index = async (req, res) => {
    try {
        // Mendapatkan data buku dari API eksternal
        const response = await axios.get(
            "https://tugas-pa-wahir-uas-enoj.vercel.app/api/peminjaman"
        );
        // Mendapatkan data buku dari API eksternal
        const bukuResponse = await axios.get(
          "https://tugas-pa-wahir-uas-enoj.vercel.app/api/buku"
        );

        const peminjaman = response.data;
        const bukuList = bukuResponse.data;

        res.render("peminjaman", {
            title: "Halaman Peminjaman",
            peminjaman, bukuList,
            layout: "main",
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Gagal mendapatkan data peminjaman dari API");
    }
};

const store = async (req, res) => {
    const { tanggalPinjam, tanggalKembali, batasPinjam, buku_id } = req.body;
    try {
        const response = await axios.post(
            "https://tugas-pa-wahir-uas-enoj.vercel.app/api/peminjaman",
            { tanggalPinjam, tanggalKembali, batasPinjam, buku_id }
        );

        if (response.status === 200 || response.status === 201) {
            res.redirect("/peminjaman");
        } else {
            res.status(500).send("Gagal menambahkan data peminjaman.");
        }
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Error menambahkan data peminjaman.");
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