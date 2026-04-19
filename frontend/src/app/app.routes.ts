import { Router, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login';
import { Dashboard } from './pages/dashboard/dashboard';
import { inject } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Register } from './pages/register/register';
import { PetComponent } from './pages/pets/pets';
import { CareComponent } from './pages/care/care';
import { Profile } from './pages/profile/profile';
import { HistoricoComponent } from './pages/historico/historico';

const authGuard = () => {
  const router = inject(Router);
  const authService = inject(AuthService);
  
  return authService.isAuthenticated() ? true : router.parseUrl('/login');
};

export const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'register', component: Register}, 
  { 
    path: 'dashboard', 
    component: Dashboard, 
    canActivate: [authGuard] 
  },
  { path: 'pets/novo', component: PetComponent },
  { path: 'pets/editar/:id', component: PetComponent },
  { 
    path: 'care/:petId', 
    component: CareComponent, 
    canActivate: [authGuard] 
  },
   { 
    path: 'historico/:petId', 
    component: HistoricoComponent, 
    canActivate: [authGuard] 
  },
  
  { path: 'perfil/:id', component: Profile, canActivate: [authGuard] },
  
];
