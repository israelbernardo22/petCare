import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { AuthService } from '../../services/auth.service';
import { Navbar } from '../navbar/navbar';

@Component({
  selector: 'app-pet-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, Navbar],
  templateUrl: './pets.html',
  styleUrls: ['./pets.scss']
})
export class PetComponent implements OnInit {
  private fb = inject(FormBuilder);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private apiService = inject(ApiService);
  private authService = inject(AuthService);

  petId = signal<string | null>(null);
  isEdit = signal(false);
  isLoading = signal(false);
  success = signal(false);
  errorMsg = signal('');

  species = ['DOG', 'CAT', 'BIRD', 'RABBIT', 'FISH', 'REPTILE', 'OTHER'];
  speciesLabels: Record<string, string> = {
    DOG: '🐶 Cachorro', CAT: '🐱 Gato', BIRD: '🐦 Pássaro',
    RABBIT: '🐰 Coelho', FISH: '🐟 Peixe', REPTILE: '🦎 Réptil', OTHER: '🐾 Outro'
  };

  form: FormGroup = this.fb.group({
    name: ['', Validators.required],
    species: ['', Validators.required],
    breed: [''],
    gender: ['UNKNOWN'],
    birthDate: [''],
    weight: [''],
    color: [''],
    microchip: [null],
    notes: [''],
  });

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.petId.set(id);
      this.isEdit.set(true);
      this.loadPet(id);
    }
  }

  loadPet(id: string) {
    this.apiService.getPetById(id).subscribe({
      next: (pet: any) => {
        this.form.patchValue({
          ...pet,
          birthDate: pet.birthDate ? pet.birthDate.substring(0, 10) : ''
        });
      },
      error: () => this.errorMsg.set('Erro ao carregar dados do pet.')
    });
  }

  onSubmit() {
    if (this.form.invalid) return;
    this.isLoading.set(true);
    this.errorMsg.set('');

    const userId = this.authService.getUserId();
    const data = {
      ...this.form.value,
      userId,
      weight: this.form.value.weight ? parseFloat(this.form.value.weight) : null,
      birthDate: this.form.value.birthDate ? new Date(this.form.value.birthDate).toISOString() : null,
    };

    const request = this.isEdit()
      ? this.apiService.updatePet(this.petId()!, data)
      : this.apiService.createPet(data);

    request.subscribe({
      next: () => {
        this.success.set(true);
        this.isLoading.set(false);
        setTimeout(() => this.router.navigate(['/dashboard']), 1500);
      },
      error: (err) => {
        this.errorMsg.set(err.error?.message || 'Erro ao salvar pet.');
        this.isLoading.set(false);
      }
    });
  }

  goBack() { this.router.navigate(['/dashboard']); }
}