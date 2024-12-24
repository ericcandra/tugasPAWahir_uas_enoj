import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { BukuComponent } from './components/buku/buku.component';
import { PeminjamanComponent } from './components/peminjaman/peminjaman.component';
import { AnggotaComponent } from './components/anggota/anggota.component';
import { DendaComponent } from './components/denda/denda.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'buku', component: BukuComponent },
  { path: 'peminjaman', component: PeminjamanComponent },
  { path: 'anggota', component: AnggotaComponent },
  { path: 'denda', component: DendaComponent },
];
