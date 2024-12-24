import { CommonModule } from '@angular/common'; // Mengimpor CommonModule agar dapat menggunakan fitur-fitur dasar Angular seperti *ngIf dan *ngFor
import { Component, OnInit, inject } from '@angular/core'; // Mengimpor dekorator Component, lifecycle hook OnInit, dan inject untuk injeksi HttpClient pada komponen standalone
import { HttpClient } from '@angular/common/http'; // Mengimpor HttpClient untuk melakukan HTTP request
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms'; // Tambahkan untuk menangani formulir
import * as bootstrap from 'bootstrap';
import { NgxPaginationModule } from 'ngx-pagination'; // Impor modul ngx-pagination

@Component({
  selector: 'app-buku', // Nama selector untuk komponen ini. Komponen akan digunakan di template dengan tag <app-fakultas></app-fakultas>
  standalone: true, // Menyatakan bahwa komponen ini adalah komponen standalone dan tidak membutuhkan module tambahan
  imports: [CommonModule, ReactiveFormsModule, NgxPaginationModule], // Mengimpor CommonModule untuk memungkinkan penggunaan direktif Angular standar seperti *ngIf dan *ngFor di template
  templateUrl: './buku.component.html', // Path ke file template HTML untuk komponen ini
  styleUrl: './buku.component.css', // Path ke file CSS untuk komponen ini
})
export class BukuComponent implements OnInit {
  // Deklarasi komponen dengan mengimplementasikan lifecycle hook OnInit
  buku: any[] = []; // Mendeklarasikan properti fakultas yang akan menyimpan data yang diterima dari API
  currentPage = 1;
  itemsPerPage = 5;

  apiUrl = 'https://tugas-pa-wahir-uas-enoj.vercel.app/api/buku'; // URL API yang digunakan untuk mendapatkan data fakultas
  isLoading = true; // Properti untuk status loading, digunakan untuk menunjukkan loader saat data sedang diambil

  bukuForm: FormGroup; // Tambahkan untuk mengelola data formulir
  isSubmitting = false; // Status untuk mencegah double submit

  private http = inject(HttpClient); // Menggunakan inject untuk mendapatkan instance HttpClient di dalam komponen standalone (untuk Angular versi terbaru yang mendukung pendekatan ini)

  private fb = inject(FormBuilder); // Inject FormBuilder untuk membuat FormGroup

  constructor() {
    // Inisialisasi form dengan kontrol nama dan singkatan
    this.bukuForm = this.fb.group({
      nama: [''],
      penulis: [''],
      tahun: [''],
      jenis: [''],
    });
  }

  ngOnInit(): void {
    // Lifecycle hook ngOnInit dipanggil saat komponen diinisialisasi
    this.getBuku(); // Memanggil method getBuku saat komponen diinisialisasi
  }

  getBuku(): void {
    // Method untuk mengambil data fakultas dari API
    // Mengambil data dari API menggunakan HttpClient
    this.http.get<any[]>(this.apiUrl).subscribe({
      next: (data) => {
        // Callback untuk menangani data yang diterima dari API
        this.buku = data; // Menyimpan data yang diterima ke dalam properti fakultas
        console.log('Data Buku:', this.buku); // Mencetak data fakultas di console untuk debugging
        this.isLoading = false; // Mengubah status loading menjadi false, yang akan menghentikan tampilan loader
      },
      error: (err) => {
        // Callback untuk menangani jika terjadi error saat mengambil data
        console.error('Error fetching buku data:', err); // Mencetak error di console untuk debugging
        this.isLoading = false; // Tetap mengubah status loading menjadi false meskipun terjadi error, untuk menghentikan loader
      },
    });
  }
  deleteBuku(_id: string): void {
    if (confirm('Apakah Anda yakin ingin menghapus data ini?')) {
      // Konfirmasi penghapusan

      const token = localStorage.getItem('authToken'); // ambil token dari localstorage
      const headers = { Authorization: `Bearer ${token}` }; // tambah bearer token ke header

      this.http.delete(`${this.apiUrl}/${_id}`,{headers}).subscribe({
        //{ headers }
        next: () => {
          console.log(`Buku dengan id ${_id} berhasil dihapus`);
          this.getBuku(); // Refresh data prodi setelah penghapusan
        },
        error: (err) => {
          console.error('Error menghapus buku:', err); // Log error jika penghapusan gagal
        },
      });
    }
  }

  editBukuId: string | null = null; // ID prodi yang sedang diubah

  // Method untuk mendapatkan data prodi berdasarkan ID
  getBukuById(_id: string): void {
    this.editBukuId = _id; // Menyimpan ID prodi yang dipilih

    this.http.get(`${this.apiUrl}/${_id}`).subscribe({
      next: (data: any) => {
        // Isi form dengan data yang diterima dari API
        this.bukuForm.patchValue({
          nama: data.nama,
          penulis: data.penulis,
          tahun: data.tahun,
          jenis: data.jenis,
        });

        // Buka modal edit
        const modalElement = document.getElementById(
          'editBukuModal'
        ) as HTMLElement;
        if (modalElement) {
          const modalInstance =
            bootstrap.Modal.getInstance(modalElement) ||
            new bootstrap.Modal(modalElement);
          modalInstance.show();
        }
      },
      error: (err) => {
        console.error('Error fetching buku data by ID:', err);
      },
    });
  }

  updateBuku(): void {
    if (this.bukuForm.valid) {
      this.isSubmitting = true;

      const token = localStorage.getItem('authToken'); // ambil token dari localstorage
      const headers = { Authorization: `Bearer ${token}` }; // tambah bearer token ke header

      this.http
        .put(`${this.apiUrl}/${this.editBukuId}`, this.bukuForm.value,{headers})
        .subscribe({
          //{ headers }
          next: (response) => {
            console.log('Buku berhasil diperbarui:', response);
            this.getBuku(); // refresh data buku
            this.isSubmitting = false;

            // Tutup modal edit setelah data berhasil diupdate
            const modalElement = document.getElementById(
              'editBukuModal'
            ) as HTMLElement;
            if (modalElement) {
              const modalInstance = bootstrap.Modal.getInstance(modalElement);
              modalInstance?.hide();
            }
          },
          error: (err) => {
            console.error('Error updating buku:', err);
            this.isSubmitting = false;
          },
        });
    }
  }
  // Method untuk menambahkan fakultas
  addBuku(): void {
    if (this.bukuForm.valid) {
      this.isSubmitting = true; // Set status submitting

      
      const token = localStorage.getItem('authToken'); // ambil token dari localstorage
      const headers = { Authorization: `Bearer ${token}` }; // tambah bearer token ke header

      this.http.post(this.apiUrl, this.bukuForm.value,{headers}).subscribe({
        // { headers }
        next: (response) => {
          console.log('Data berhasil ditambahkan:', response);
          this.getBuku(); // Refresh data fakultas
          this.bukuForm.reset(); // Reset formulir
          this.isSubmitting = false; // Reset status submitting

          // Tutup modal setelah data berhasil ditambahkan
          //   const modalElement = document.getElementById('tambahFakultasModal') as HTMLElement;
          //   if (modalElement) {
          //     const modalInstance = bootstrap.Modal.getInstance(modalElement) || new bootstrap.Modal(modalElement);
          //     modalInstance.hide();

          //     // Hapus elemen backdrop jika ada
          //     const backdrop = document.querySelector('.modal-backdrop');
          //     if (backdrop) {
          //       backdrop.remove();
          //     }

          //     // Pulihkan scroll pada body
          //     document.body.classList.remove('modal-open');
          //     document.body.style.overflow = '';
          //     document.body.style.paddingRight = '';
          //   }
          // },
          // error: (err) => {
          //   console.error('Error menambahkan fakultas:', err);
          //   this.isSubmitting = false;
        },
      });
    }
  }
}
