import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import * as bootstrap from 'bootstrap';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'app-denda',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NgxPaginationModule],
  templateUrl: './denda.component.html',
  styleUrls: ['./denda.component.css'],
})
export class DendaComponent implements OnInit {
  denda: any[] = [];
  bukuList: any[] = [];
  anggotaList: any[] = [];
  currentPage = 1;
  itemsPerPage = 5;
  apiDendaUrl = 'https://tugas-pa-wahir-uas-enoj.vercel.app/api/denda';
  apiBukuUrl = 'https://tugas-pa-wahir-uas-enoj.vercel.app/api/buku';
  apiAnggotaUrl = 'https://tugas-pa-wahir-uas-enoj.vercel.app/api/anggota';
  isLoading = true;
  dendaForm: FormGroup;
  isSubmitting = false;
  editDendaId: string | null = null;

  private http = inject(HttpClient);
  private fb = inject(FormBuilder);

  constructor() {
    this.dendaForm = this.fb.group({
      jumlahPinjam: ['', [Validators.required]],
      buku_id: ['', [Validators.required]],
      anggota_id: ['', [Validators.required]],
      harga: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.getDenda();
    this.getBuku();
    this.getAnggota();
  }

  // Fetch all denda data
  getDenda(): void {
    this.http.get<any[]>(this.apiDendaUrl).subscribe({
      next: (data) => {
        this.denda = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error fetching denda data:', err);
        this.isLoading = false;
      },
    });
  }

  // Fetch all buku data
  getBuku(): void {
    this.http.get<any[]>(this.apiBukuUrl).subscribe({
      next: (data) => {
        this.bukuList = data;
      },
      error: (err) => {
        console.error('Error fetching buku data:', err);
      },
    });
  }

  // Fetch all anggota data
  getAnggota(): void {
    this.http.get<any[]>(this.apiAnggotaUrl).subscribe({
      next: (data) => {
        this.anggotaList = data;
      },
      error: (err) => {
        console.error('Error fetching anggota data:', err);
      },
    });
  }

  // Add a new denda
  addDenda(): void {
    if (this.dendaForm.valid) {
      this.isSubmitting = true;

      const token = localStorage.getItem('authToken'); // ambil token dari localstorage
      const headers = { Authorization: `Bearer ${token}` }; // tambah bearer token ke header

      this.http.post(this.apiDendaUrl, this.dendaForm.value, {headers}).subscribe({
        next: (response) => {
          console.log('Denda added successfully:', response);
          this.getDenda();
          this.dendaForm.reset();
          this.isSubmitting = false;
          const modalElement = document.getElementById('tambahDendaModal') as HTMLElement;
          if (modalElement) {
            const modalInstance = bootstrap.Modal.getInstance(modalElement) || new bootstrap.Modal(modalElement);
            modalInstance.hide();
          }
        },
        error: (err) => {
          console.error('Error adding denda:', err);
          this.isSubmitting = false;
        },
      });
    }
  }

  // Delete a denda by ID
  deleteDenda(id: string): void {
    if (confirm('Are you sure you want to delete this denda?')) {

      const token = localStorage.getItem('authToken'); // ambil token dari localstorage
      const headers = { Authorization: `Bearer ${token}` }; // tambah bearer token ke header

      this.http.delete(`${this.apiDendaUrl}/${id}`, {headers}).subscribe({
        next: () => {
          console.log(`Denda with ID ${id} deleted successfully.`);
          this.getDenda();
        },
        error: (err) => {
          console.error('Error deleting denda:', err);
        },
      });
    }
  }

  // Fetch denda data by ID and populate the form for editing
  getDendaById(id: string): void {
    this.editDendaId = id;
    this.http.get(`${this.apiDendaUrl}/${id}`).subscribe({
      next: (data: any) => {
        this.dendaForm.patchValue({
          jumlahPinjam: data.jumlahPinjam,
          buku_id: data.buku_id,
          anggota_id: data.anggota_id,
          harga: data.harga,
        });
        const modalElement = document.getElementById('editDendaModal') as HTMLElement;
        if (modalElement) {
          const modalInstance = bootstrap.Modal.getInstance(modalElement) || new bootstrap.Modal(modalElement);
          modalInstance.show();
        }
      },
      error: (err) => {
        console.error('Error fetching denda data by ID:', err);
      },
    });
  }

  // Update denda data
  updateDenda(): void {
    if (this.dendaForm.valid && this.editDendaId) {
      this.isSubmitting = true;

      const token = localStorage.getItem('authToken'); // ambil token dari localstorage
      const headers = { Authorization: `Bearer ${token}` }; // tambah bearer token ke header

      this.http.put(`${this.apiDendaUrl}/${this.editDendaId}`, this.dendaForm.value, {headers}).subscribe({
        next: (response) => {
          console.log('Denda updated successfully:', response);
          this.getDenda();
          this.isSubmitting = false;
          const modalElement = document.getElementById('editDendaModal') as HTMLElement;
          if (modalElement) {
            const modalInstance = bootstrap.Modal.getInstance(modalElement);
            modalInstance?.hide();
          }
        },
        error: (err) => {
          console.error('Error updating denda:', err);
          this.isSubmitting = false;
        },
      });
    }
  }
}
