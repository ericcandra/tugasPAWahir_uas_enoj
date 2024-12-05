const index = (req, res) => {
  const perpus = [
    {
      judul: "Pemrograman Aplikasi Web 1",
      isi: "berisi tentang pembuatan aplikasi berbasis web",
    },
    {
      judul: "Pemrograman Aplikasi Web 2",
      isi: "berisi tentang pembuatan aplikasi berbasis web",
    },
    {
      judul: "Pemrograman Aplikasi Bergerak 1",
      isi: "berisi tentang pembuatan aplikasi berbasis mobile",
    },
    {
      judul: "Pemrograman Aplikasi Bergerak 2",
      isi: "berisi tentang pembuatan aplikasi berbasis mobile",
    },
    {
      judul: "Peracangan Aplikasi",
      isi: "berisi tentang bagaimana merancang sebuah aplikasi",
    },
    {
      judul: "Analisis",
      isi: "berisi tentang bagaimana mencari sebuah ide",
    },
  ];
  res.render("home", { title: "halaman home", perpus, layout: "main" });
};

const about = (req, res) => {
  res.render("about", { title: "About", layout: "main" });
};

const use =
  ("/",
  (req, res) => {
    res.send("<h1>404 Not Found</h1>");
  });
module.exports = { index, use, about };
