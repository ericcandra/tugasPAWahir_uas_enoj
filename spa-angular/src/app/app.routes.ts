import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { BukuComponent } from './components/buku/buku.component';
import { PeminjamanComponent } from './components/peminjaman/peminjaman.component';
import { AnggotaComponent } from './components/anggota/anggota.component';
import { DendaComponent } from './components/denda/denda.component';
import { PengembalianComponent } from './components/pengembalian/pengembalian.component';
import { AuthComponent } from './components/auth/auth.component';
import { AuthGuard } from './auth.guard';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'buku', component: BukuComponent, canActivate: [AuthGuard]},
  { path: 'peminjaman', component: PeminjamanComponent, canActivate: [AuthGuard] },
  { path: 'anggota', component: AnggotaComponent, canActivate: [AuthGuard] },
  { path: 'denda', component: DendaComponent, canActivate: [AuthGuard] },
  { path: 'pengembalian', component: PengembalianComponent, canActivate: [AuthGuard]},
  { path: 'auth', component: AuthComponent},
  { path: '**', redirectTo: 'auth'},
];
