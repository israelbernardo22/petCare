import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  imports: [],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
})
export class Navbar {
  userId: any;


constructor(private router: Router, private authService: AuthService) {}

 editar(): void {
   this.userId = this.authService.getUserId();
    this.router.navigate(['perfil' , this.userId]);
  }

  logout(): void {
    localStorage.removeItem('auth_token');
    this.router.navigate(['']);
  }

}
