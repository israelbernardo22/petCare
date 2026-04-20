import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { Navbar } from '../navbar/navbar';

@Component({
  selector: 'app-historico',
  standalone: true,
  imports: [CommonModule, Navbar],
  templateUrl: './historico.html',
  styleUrls: ['./historico.scss']
})
export class HistoricoComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private apiService = inject(ApiService);

  records = signal<any[]>([]);
  isLoading = signal(true);
  petId = '';
 recordId = '';

 careLabels: Record<string, string> = {
    VACCINE: 'Vacina', CONSULTATION: 'Consulta', MEDICATION: 'Medicação',
    EXAM: 'Exame', SURGERY: 'Cirurgia', GROOMING: 'Banho/Tosa', OTHER: 'Outro'
  };

careIcons: Record<string, string> = {
    VACCINE: '💉', CONSULTATION: '🩺', MEDICATION: '💊',
    EXAM: '🔬', SURGERY: '🏥', GROOMING: '✂️', OTHER: '📋'
  };

 careColors: Record<string, string> = {
    VACCINE: 'badge-vaccine', CONSULTATION: 'badge-consultation',
    MEDICATION: 'badge-medication', EXAM: 'badge-exam',
    SURGERY: 'badge-surgery', GROOMING: 'badge-grooming', OTHER: 'badge-other'
  };

  ngOnInit() {
    this.petId = this.route.snapshot.paramMap.get('petId') || '';
    this.loadHistory();
  }

  deleteRecord(id: string) {
  if (!confirm('Tem certeza que deseja excluir este registro?')) return;

  this.apiService.deleteRecord(id).subscribe({
    next: () => {
      this.records.set(this.records().filter(r => r.id !== id));
    },
    error: () => {
      alert('Erro ao excluir registro');
    }
  });
}

  navigateToEditRegister(recordId: string) {
    this.router.navigate(['/care', this.petId, recordId]);
  }
  loadHistory() {
    this.isLoading.set(true);
    this.apiService.getHistory(this.petId).subscribe({
      next: (data: any) => {
        this.records.set(data);
        this.isLoading.set(false);
      },
      error: () => this.isLoading.set(false)
    });
  }

  goBack() { this.router.navigate(['/dashboard']); }

  formatDate(date: string) {
    return new Date(date).toLocaleDateString('pt-BR');
  }
}