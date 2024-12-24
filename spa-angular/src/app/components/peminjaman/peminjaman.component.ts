import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import * as bootstrap from 'bootstrap';

@Component({
  selector: 'app-peminjaman',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NgxPaginationModule],
  templateUrl: './peminjaman.component.html',
  styleUrls: ['./peminjaman.component.css'],
})
export class PeminjamanComponent implements OnInit {
  peminjaman: any[] = [];
  buku: any[] = [];
  currentPage = 1;
  itemsPerPage = 5;
  isLoading = true;
  isSubmitting = false;
  editPeminjamanId: string | null = null;

  apiPeminjamanUrl = 'https://tugas-pa-wahir-uas-enoj.vercel.app/api/peminjaman';
  apiBukuUrl = 'https://tugas-pa-wahir-uas-enoj.vercel.app/api/buku';

  peminjamanForm: FormGroup;
  private http = inject(HttpClient);
  private fb = inject(FormBuilder);

  constructor() {
    this.peminjamanForm = this.fb.group({
      tanggalPinjam: [''],
      tanggalKembali: [''],
      batasPinjam: [''],
      buku_id: [''],
    });
  }

  ngOnInit(): void {
    this.getPeminjaman();
    this.getBuku();
  }

  getPeminjaman(): void {
    this.isLoading = true;
    this.http.get<any[]>(this.apiPeminjamanUrl).subscribe({
      next: (data) => {
        this.peminjaman = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error fetching peminjaman data:', err);
        this.isLoading = false;
      },
    });
  }

  getBuku(): void {
    this.http.get<any[]>(this.apiBukuUrl).subscribe({
      next: (data) => {
        this.buku = data;
      },
      error: (err) => {
        console.error('Error fetching buku data:', err);
      },
    });
  }

  addPeminjaman(): void {
    if (this.peminjamanForm.valid) {
      this.isSubmitting = true;

      const token = localStorage.getItem('authToken'); // ambil token dari localstorage
      const headers = { Authorization: `Bearer ${token}` }; // tambah bearer token ke header

      this.http.post(this.apiPeminjamanUrl, this.peminjamanForm.value, {headers}).subscribe({
        next: (response) => {
          console.log('Data berhasil ditambahkan:', response);
          this.getPeminjaman();
          this.peminjamanForm.reset();
          this.isSubmitting = false;
          const modalElement = document.getElementById('tambahProdiModal') as HTMLElement;
          if (modalElement) {
            const modalInstance = bootstrap.Modal.getInstance(modalElement) || new bootstrap.Modal(modalElement);
            modalInstance.hide();

            // Hapus elemen backdrop jika ada
            const backdrop = document.querySelector('.modal-backdrop');
            if (backdrop) {
              backdrop.remove();
            }

            // Pulihkan scroll pada body
            document.body.classList.remove('modal-open');
            document.body.style.overflow = '';
            document.body.style.paddingRight = '';
          }
        },
        error: (err) => {
          console.error('Error adding peminjaman:', err);
          this.isSubmitting = false;
        },
      });
    }
  }

  getPeminjamanById(_id: string): void {
    this.editPeminjamanId = _id;
    this.http.get<any>(`${this.apiPeminjamanUrl}/${_id}`).subscribe({
      next: (data) => {
        this.peminjamanForm.patchValue(data);
        this.openModal('editPeminjamanModal');
      },
      error: (err) => {
        console.error('Error fetching peminjaman by ID:', err);
      },
    });
  }

  updatePeminjaman(): void {
    if (this.peminjamanForm.valid && this.editPeminjamanId) {
      this.isSubmitting = true;

      const token = localStorage.getItem('authToken'); // ambil token dari localstorage
      const headers = { Authorization: `Bearer ${token}` }; // tambah bearer token ke header

      this.http.put(`${this.apiPeminjamanUrl}/${this.editPeminjamanId}`, this.peminjamanForm.value, {headers}).subscribe({
        next: () => {
          this.getPeminjaman();
          this.isSubmitting = false;
          this.closeModal('editPeminjamanModal');
        },
        error: (err) => {
          console.error('Error updating peminjaman:', err);
          this.isSubmitting = false;
        },
      });
    }
  }

  deletePeminjaman(_id: string): void {
    if (confirm('Apakah Anda yakin ingin menghapus data ini?')) {

      const token = localStorage.getItem('authToken'); // ambil token dari localstorage
      const headers = { Authorization: `Bearer ${token}` }; // tambah bearer token ke header

      this.http.delete(`${this.apiPeminjamanUrl}/${_id}`, {headers}).subscribe({
        next: () => {
          this.getPeminjaman();
        },
        error: (err) => {
          console.error('Error deleting peminjaman:', err);
        },
      });
    }
  }

  openModal(modalId: string): void {
    const modalElement = document.getElementById(modalId) as HTMLElement;
    if (modalElement) {
      const modalInstance = bootstrap.Modal.getInstance(modalElement) || new bootstrap.Modal(modalElement);
      modalInstance.show();
    }
  }

  closeModal(modalId: string): void {
    const modalElement = document.getElementById(modalId) as HTMLElement;
    if (modalElement) {
      const modalInstance = bootstrap.Modal.getInstance(modalElement);
      modalInstance?.hide();
    }
  }
}
