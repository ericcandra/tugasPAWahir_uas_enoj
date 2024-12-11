const index = (req, res) => {
  const perpus = [
    {
      
      judul: "Pengembangan Aplikasi Web 1",
      isi: "berisi tentang pembuatan aplikasi berbasis web",
      gambar: "img/buku1.jpg"
    },
    {
      judul: "Pengembangan Aplikasi Web 2",
      isi: "berisi tentang pembuatan aplikasi berbasis web",
      gambar: "img/buku2.jpg"
    },
    {
      judul: "Pengembangan Aplikasi Bergerak 1",
      isi: "berisi tentang pembuatan aplikasi berbasis mobile",
      gambar: "img/buku3.jpg"
    },
    {
      judul: "Pengembangan Aplikasi Bergerak 2",
      isi: "berisi tentang pembuatan aplikasi berbasis mobile",
      gambar: "img/buku4.jpg"
    },
    {
      judul: "Peracangan Basis Data",
      isi: "berisi tentang bagaimana merancang sebuah data",
      gambar: "img/buku5.jpg"
    },
    {
      judul: "Analisis sistem informasi",
      isi: "berisi tentang bagaimana menganalisi sistem informasi",
      gambar: "img/buku6.jpg"
    },
  ];
  res.render("/", { title: "halaman home", perpus, layout: "main" });
};

const about = (req, res) => {
  res.render("about", { title: "About", layout: "main" });
};
const contact = (req, res) => {
  res.render("contact", { title: "Contact Us!", layout: "main" });
};

const use =
  ("/",
  (req, res) => {
    res.send("<h1>404 Not Found</h1>");
  });
module.exports = { index, use, about,contact };
