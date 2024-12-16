const axios = require("axios");

const index = async (req, res) => {
    try {
        // mendapatkan data buku dari API eksternal
        const response = await axios.get(
            "https://tugas-pa-wahir-uas-enoj.vercel.app/api/buku"
            // cloud mongodb
        );

        const buku = response.data;

        res.render("buku", {
            title: "Halaman Buku",
            buku,
            layout: "main",
        });
    }catch (error)  {
        console.error(error.mesage);
        res.status(500).send("Gagal mendapatkan data buku dari api");
    }
};

const store = async (req, res) => {
    const { nama, penulis, tahun, jenis } = req.body;
    try {
      const response = await fetch(
            "https://tugas-pa-wahir-uas-enoj.vercel.app/api/buku",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ nama, penulis, tahun, jenis }),
        }
      );
  
      if (response.ok) {
        res.redirect("/buku"); // Redirect ke halaman buku setelah berhasil menambah
      } else {
        res.status(500).send("Gagal menambahkan data buku.");
      }
    } catch (error) {
      res.status(500).send("Error menambahkan data buku");
    }
  };

  const update = async (req, res) => {
  
    const { nama, penulis, tahun, jenis } = req.body; // Data yang akan diperbarui

    console.log("Data yang diterima:", { nama, penulis, tahun, jenis });

    try {
        const response = await fetch(
            `https://tugas-pa-wahir-uas-enoj.vercel.app/api/buku`,
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ nama, penulis, tahun, jenis }),
            }
        );

        console.log("Status Code:", response.status);

        if (response.ok) {
            res.redirect("/buku"); // Redirect setelah berhasil
        } else {
            const errorText = await response.text();
            console.error("Error API:", errorText);
            res.status(500).send("Gagal memperbarui data buku.");
        }
    } catch (error) {
        console.error("Error:", error.message);
        res.status(500).send("Error memperbarui data buku.");
    }
};


module.exports = { index, store, update };
