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
  selector: 'app-pengembalian',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NgxPaginationModule],
  templateUrl: './pengembalian.component.html',
  styleUrls: ['./pengembalian.component.css'],
})
export class PengembalianComponent implements OnInit {
  pengembalian: any[] =  [];
  bukuList: any[] = [];
  anggotaList: any[] = [];
  dendaList: any[] = [];
  currentPage = 1;
  itemsPerPage = 5;
  apiUrl = 'https://tugas-pa-wahir-uas-enoj.vercel.app/api/pengembalian';
  apiBukuUrl = 'https://tugas-pa-wahir-uas-enoj.vercel.app/api/buku';
  apiAnggotaUrl = 'https://tugas-pa-wahir-uas-enoj.vercel.app/api/anggota';
  apiDendaUrl = 'https://tugas-pa-wahir-uas-enoj.vercel.app/api/denda';
  isLoading = true;
  pengembalianForm: FormGroup;
  isSubmitting = false;
  editPengembalianId: string | null = null;

  private http = inject(HttpClient);
  private fb = inject(FormBuilder);

  constructor() {
    this.pengembalianForm = this.fb.group({
      buku_id: ['', [Validators.required]],
      anggota_id: ['', [Validators.required]],
      denda_id: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.getPengembalian();
    this.getBuku();
    this.getAnggota();
    this.getDenda();
  }

  // Fetch all denda data
  getPengembalian(): void {
    this.http.get<any[]>(this.apiUrl).subscribe({
      next: (data) => {
        this.pengembalian = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error fetching pengembalian data:', err);
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
  getDenda(): void {
    this.http.get<any[]>(this.apiDendaUrl).subscribe({
      next: (data) => {
        this.dendaList = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error fetching denda data:', err);
        this.isLoading = false;
      },
    });
  }

  // Add a new denda
  addPengembalian(): void {
    if (this.pengembalianForm.valid) {
      this.isSubmitting = true;

      const token = localStorage.getItem('authToken'); // ambil token dari localstorage
      const headers = { Authorization: `Bearer ${token}` }; // tambah bearer token ke header

      this.http.post(this.apiUrl, this.pengembalianForm.value, {headers}).subscribe({
        next: (response) => {
          console.log('Pengembalian added successfully:', response);
          this.getPengembalian();
          this.pengembalianForm.reset();
          this.isSubmitting = false;
          const modalElement = document.getElementById('tambahPengembalianModal') as HTMLElement;
          if (modalElement) {
            const modalInstance = bootstrap.Modal.getInstance(modalElement) || new bootstrap.Modal(modalElement);
            modalInstance.hide();
          }
        },
        error: (err) => {
          console.error('Error adding pengembalian:', err);
          this.isSubmitting = false;
        },
      });
    }
  }

  // Delete a denda by ID
  deletePengembalian(id: string): void {
    if (confirm('Are you sure you want to delete this pengembalian?')) {
      const token = localStorage.getItem('authToken'); // ambil token dari localstorage
      const headers = { Authorization: `Bearer ${token}` }; // tambah bearer token ke header

      this.http.delete(`${this.apiUrl}/${id}`, {headers}).subscribe({
        next: () => {
          console.log(`Pengembalian with ID ${id} deleted successfully.`);
          this.getPengembalian();
        },
        error: (err) => {
          console.error('Error deleting pengembalian:', err);
        },
      });
    }
  }

  // Fetch denda data by ID and populate the form for editing
  getPengembalianById(id: string): void {
    this.editPengembalianId = id;
    this.http.get(`${this.apiUrl}/${id}`).subscribe({
      next: (data: any) => {
        this.pengembalianForm.patchValue({
          buku_id: data.buku_id,
          anggota_id: data.anggota_id,
          denda_id: data.denda_id,
        });
        const modalElement = document.getElementById(
          'editPengembalianModal'
        ) as HTMLElement;
        if (modalElement) {
          const modalInstance =
            bootstrap.Modal.getInstance(modalElement) ||
            new bootstrap.Modal(modalElement);
          modalInstance.show();
        }
      },
      error: (err) => {
        console.error('Error fetching pengembalian data by ID:', err);
      },
    });
  }

  // Update denda data
  updatePengembalian(): void {
    if (this.pengembalianForm.valid && this.editPengembalianId) {
      this.isSubmitting = true;

      const token = localStorage.getItem('authToken'); // ambil token dari localstorage
      const headers = { Authorization: `Bearer ${token}` }; // tambah bearer token ke header

      this.http.put(`${this.apiUrl}/${this.editPengembalianId}`, this.pengembalianForm.value, {headers}).subscribe({
        next: (response) => {
          console.log('Pengembalian updated successfully:', response);
          this.getPengembalian();
          this.isSubmitting = false;
          const modalElement = document.getElementById('editPengembalianModal') as HTMLElement;
          if (modalElement) {
            const modalInstance = bootstrap.Modal.getInstance(modalElement);
            modalInstance?.hide();
          }
        },
        error: (err) => {
          console.error('Error updating pengembalian:', err);
          this.isSubmitting = false;
        },
      });
    }
  }
}
