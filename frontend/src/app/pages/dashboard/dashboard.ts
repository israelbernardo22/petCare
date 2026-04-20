import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { AuthService } from '../../services/auth.service';
import { Navbar } from '../navbar/navbar';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule, Navbar],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css']
})


export class Dashboard implements OnInit {
  private apiService = inject(ApiService);
  private authService = inject(AuthService);
  private router = inject(Router);

  
  userName = signal<string>('Usuário');
  pets = signal<any[]>([]);
  isLoading = signal<boolean>(true);

  ngOnInit(): void {
   
    const userName = this.authService.getUserName();
    const userId = this.authService.getUserId();

    if (userName) {
    this.userName.set(userName);
  }

    if (userId) {
      this.fetchPets(userId);
    } else {
      this.logout();
    }
  }

  
getSpeciesEmoji(species: string): string {
  const emojis: Record<string, string> = {
    DOG: '🐶',
    CAT: '🐱',
    BIRD: '🐦',
    RABBIT: '🐰',
    FISH: '🐟',
    REPTILE: '🦎',
    OTHER: '🐾'
  };
  return emojis[species] || '🐾';
}

  fetchPets(userId: string): void {
    this.isLoading.set(true);
    
    
    this.apiService.getPets(userId).subscribe({
      next: (data: any) => {
       
        this.pets.set(data);
        this.isLoading.set(false);
      },
      error: (err) => {
        console.error('Erro ao buscar pets no MySQL:', err);
        this.isLoading.set(false);
      }
    });
  }

  logout(): void {
    localStorage.removeItem('auth_token');
    this.router.navigate(['']);
  }

  navigateToAddPet(): void {
    this.router.navigate(['/pets/novo']);
  }
deletePet(petId: string): void {
  if (!confirm('Tem certeza que deseja excluir este pet?')) return;
  this.apiService.deletePet(petId).subscribe({
    next: () => {
      this.pets.set(this.pets().filter(p => p.id !== petId));
    },
    error: () => {
      alert('Erro ao excluir pet');
    }
  });
}
  navigateToEditPet(petId: string): void {
    this.router.navigate(['/pets/editar', petId]);
  }
  navigateToRegisterCare(petId: string): void {
    this.router.navigate(['/care', petId]);
  }
  viewHistory(petId: string): void {
    
    this.router.navigate(['/historico', petId]);
  }
}
