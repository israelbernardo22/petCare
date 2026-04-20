import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { Navbar } from '../navbar/navbar';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, Navbar],
  templateUrl: './profile.html',
  styleUrls: ['./profile.scss']
})
export class Profile implements OnInit {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private apiService = inject(ApiService);
private route = inject(ActivatedRoute);
  isLoading = signal(false);
  success = signal(false);
  errorMsg = signal('');
  userId = '';

  form: FormGroup = this.fb.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    phone: [''],
    avatarUrl: [''],
    password: [''],
    confirmPassword: [''],
  });

  ngOnInit() {
this.userId = this.route.snapshot.paramMap.get('id') || '';
    this.loadUser();
  }

  loadUser() {
    this.apiService.getUserById(this.userId).subscribe({
      next: (user: any) => this.form.patchValue(user),
      error: () => this.errorMsg.set('Erro ao carregar perfil.')
    });
  }

  onSubmit() {
    if (this.form.invalid) return;

    if (this.form.value.password && this.form.value.password !== this.form.value.confirmPassword) {
      this.errorMsg.set('As senhas não coincidem.');
      return;
    }

    this.isLoading.set(true);
    this.errorMsg.set('');

    const data: any = {
      name: this.form.value.name,
      email: this.form.value.email,
      phone: this.form.value.phone || null,
      avatarUrl: this.form.value.avatarUrl || null,
    };

    if (this.form.value.password) {
      data.password = this.form.value.password;
    }

    this.apiService.updateUser(this.userId, data).subscribe({
      next: () => {
        this.success.set(true);
        this.isLoading.set(false);
        setTimeout(() => this.router.navigate(['/dashboard']), 1500);
      },
      error: (err) => {
        this.errorMsg.set(err.error?.error || 'Erro ao atualizar perfil.');
        this.isLoading.set(false);
      }
    });
  }

  goBack() { this.router.navigate(['/dashboard']); }
}