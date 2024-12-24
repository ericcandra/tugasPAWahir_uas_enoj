import { CommonModule } from '@angular/common'; // Import Angular common module for directives like ngIf, ngFor, etc.
import { Component, OnInit, inject } from '@angular/core'; // Import Component decorator, OnInit interface, and inject for dependency injection.
import { HttpClient } from '@angular/common/http'; // Import HttpClient for API requests.
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms'; // Import reactive forms modules and validators.
import * as bootstrap from 'bootstrap';
import { NgxPaginationModule } from 'ngx-pagination'; // Import Bootstrap for modal and UI handling.

@Component({
  selector: 'app-anggota', // Selector for this component to be used in templates.
  standalone: true, // Mark this component as standalone.
  imports: [CommonModule, ReactiveFormsModule, NgxPaginationModule], // Import necessary Angular modules.
  templateUrl: './anggota.component.html', // Path to the HTML template for this component.
  styleUrl: './anggota.component.css', // Path to the CSS styles for this component.
})
export class AnggotaComponent implements OnInit {
  anggota: any[] = []; // Holds anggota data.
  bukuList: any[] = []; // Holds list of buku for the dropdown.
  currentPage = 1;
  itemsPerPage = 5;
  apiAnggotaUrl = 'https://tugas-pa-wahir-uas-enoj.vercel.app/api/anggota'; // API URL for anggota operations.
  apiBukuUrl = 'https://tugas-pa-wahir-uas-enoj.vercel.app/api/buku'; // API URL for fetching buku data.
  isLoading = true; // Indicates loading state.
  anggotaForm: FormGroup; // Reactive form group for anggota.
  isSubmitting = false; // Indicates if the form is being submitted.
  editAnggotaId: string | null = null; // Holds the ID of the anggota being edited.

  private http = inject(HttpClient); // Inject HttpClient for API requests.
  private fb = inject(FormBuilder); // Inject FormBuilder for reactive forms.

  constructor() {
    // Initialize the reactive form with validation.
    this.anggotaForm = this.fb.group({
      npm: ['', [Validators.required]], // Field for NPM (required).
      nama: ['', [Validators.required]], // Field for Nama (required).
      buku_id: ['', [Validators.required]], // Field for Buku_Id (required).
    });
  }

  ngOnInit(): void {
    this.getAnggota(); // Fetch anggota data on initialization.
    this.getBuku(); // Fetch buku data for the dropdown.
  }

  // Fetch all anggota data
  getAnggota(): void {
    this.http.get<any[]>(this.apiAnggotaUrl).subscribe({
      next: (data) => {
        this.anggota = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error fetching anggota data:', err);
        this.isLoading = false;
      },
    });
  }

  // Fetch all buku data for the dropdown
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

  // Add a new anggota
  addAnggota(): void {
    if (this.anggotaForm.valid) {
      this.isSubmitting = true;

      const token = localStorage.getItem('authToken'); // ambil token dari localstorage
      const headers = { Authorization: `Bearer ${token}` }; // tambah bearer token ke header

      this.http.post(this.apiAnggotaUrl, this.anggotaForm.value, {headers}).subscribe({
        next: (response) => {
          console.log('Anggota added successfully:', response);
          this.getAnggota(); // Refresh anggota data.
          this.anggotaForm.reset(); // Reset the form.
          this.isSubmitting = false;

          // Close the modal
          const modalElement = document.getElementById(
            'tambahAnggotaModal'
          ) as HTMLElement;
          if (modalElement) {
            const modalInstance =
              bootstrap.Modal.getInstance(modalElement) ||
              new bootstrap.Modal(modalElement);
            modalInstance.hide();
          }
        },
        error: (err) => {
          console.error('Error adding anggota:', err);
          this.isSubmitting = false;
        },
      });
    }
  }

  // Delete an anggota by ID
  deleteAnggota(id: string): void {
    if (confirm('Are you sure you want to delete this anggota?')) {

      const token = localStorage.getItem('authToken'); // ambil token dari localstorage
      const headers = { Authorization: `Bearer ${token}` }; // tambah bearer token ke header

      this.http.delete(`${this.apiAnggotaUrl}/${id}`, {headers}).subscribe({
        next: () => {
          console.log(`Anggota with ID ${id} deleted successfully.`);
          this.getAnggota(); // Refresh anggota data.
        },
        error: (err) => {
          console.error('Error deleting anggota:', err);
        },
      });
    }
  }

  // Fetch anggota data by ID and populate the form for editing
  getAnggotaById(id: string): void {
    this.editAnggotaId = id;

    this.http.get(`${this.apiAnggotaUrl}/${id}`).subscribe({
      next: (data: any) => {
        this.anggotaForm.patchValue({
          npm: data.npm,
          nama: data.nama,
          buku_id: data.buku_id,
        });

        // Open the edit modal
        const modalElement = document.getElementById(
          'editAnggotaModal'
        ) as HTMLElement;
        if (modalElement) {
          const modalInstance =
            bootstrap.Modal.getInstance(modalElement) ||
            new bootstrap.Modal(modalElement);
          modalInstance.show();
        }
      },
      error: (err) => {
        console.error('Error fetching anggota data by ID:', err);
      },
    });
  }

  // Update anggota data
  updateAnggota(): void {
    if (this.anggotaForm.valid && this.editAnggotaId) {
      this.isSubmitting = true;

      const token = localStorage.getItem('authToken'); // ambil token dari localstorage
      const headers = { Authorization: `Bearer ${token}` }; // tambah bearer token ke header

      this.http
        .put(
          `${this.apiAnggotaUrl}/${this.editAnggotaId}`,
          this.anggotaForm.value, {headers}
        )
        .subscribe({
          next: (response) => {
            console.log('Anggota updated successfully:', response);
            this.getAnggota(); // Refresh anggota data.
            this.isSubmitting = false;

            // Close the edit modal
            const modalElement = document.getElementById(
              'editAnggotaModal'
            ) as HTMLElement;
            if (modalElement) {
              const modalInstance = bootstrap.Modal.getInstance(modalElement);
              modalInstance?.hide();
            }
          },
          error: (err) => {
            console.error('Error updating anggota:', err);
            this.isSubmitting = false;
          },
        });
    }
  }
}
