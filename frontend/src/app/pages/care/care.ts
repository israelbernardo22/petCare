import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { Navbar } from '../navbar/navbar';

@Component({
  selector: 'app-registro-cuidado',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, Navbar],
  templateUrl: './care.html',
  styleUrls: ['./care.scss']
})
export class CareComponent implements OnInit {
  private fb = inject(FormBuilder);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private apiService = inject(ApiService);

  petId = '';
  isLoading = signal(false);
  success = signal(false);
  errorMsg = signal('');
  recordId = "";
  isEdit = signal(false);

  careTypes = [
    { value: 'VACCINE', label: '💉 Vacina' },
    { value: 'CONSULTATION', label: '🩺 Consulta' },
    { value: 'MEDICATION', label: '💊 Medicação' },
    { value: 'EXAM', label: '🔬 Exame' },
    { value: 'SURGERY', label: '🏥 Cirurgia' },
    { value: 'GROOMING', label: '✂️ Banho/Tosa' },
    { value: 'OTHER', label: '📋 Outro' },
  ];

  form: FormGroup = this.fb.group({
    type: ['', Validators.required],
    title: ['', Validators.required],
    description: [''],
    performedAt: ['', Validators.required],
    nextDueAt: [''],
    veterinarian: [''],
    clinic: [''],
    cost: [''],
    dosage: [''],
    batchNumber: [''],
  });

  ngOnInit() {
    this.petId = this.route.snapshot.paramMap.get('petId') || '';
     this.recordId = this.route.snapshot.paramMap.get('recordId') || '';
  if (this.recordId) {
    this.isEdit.set(true);
    this.loadRecord(this.recordId, this.petId);
  }
  }

  loadRecord(id: string, petId: string) {
  this.apiService.getRecordById(petId, id).subscribe({
    next: (record: any) => {
      this.form.patchValue({
        ...record,
        performedAt: record.performedAt?.substring(0, 10),
        nextDueAt: record.nextDueAt?.substring(0, 10)
      });
    },
    error: () => this.errorMsg.set('Erro ao carregar registro.')
  });
}

  onSubmit() {
    if (this.form.invalid) return;
    this.isLoading.set(true);
    this.errorMsg.set('');

    const data = {
      ...this.form.value,
      petId: this.petId,
      performedAt: new Date(this.form.value.performedAt).toISOString(),
      nextDueAt: this.form.value.nextDueAt ? new Date(this.form.value.nextDueAt).toISOString() : null,
      cost: this.form.value.cost ? parseFloat(this.form.value.cost) : null,
    };

    const request = this.isEdit()
  ? this.apiService.updateCare(this.recordId, data)
  : this.apiService.createCare(data);

request.subscribe({
  next: () => {
    this.success.set(true);
    this.isLoading.set(false);
    setTimeout(() => this.router.navigate(['/dashboard']), 1500);
  },
  error: (err) => {
    this.errorMsg.set(err.error?.message || 'Erro ao salvar registro.');
    this.isLoading.set(false);
  }
});
  }

  goBack() { this.router.navigate(['/dashboard']); }
}