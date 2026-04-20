import { Injectable, signal } from '@angular/core';
import { jwtDecode } from 'jwt-decode';

interface TokenPayload {
  id: string;
  exp: number;
  name: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  currentUser = signal<TokenPayload | null>(null);

  saveToken(token: string) {
    localStorage.setItem('auth_token', token);
    this.decodeAndSetUser(token);
  }

  private decodeAndSetUser(token: string) {
    try {
      
      const decoded = jwtDecode<TokenPayload>(token);
      console.log("TOKEN DECODIFICADO:", decoded);
      this.currentUser.set(decoded);
    } catch {
      this.currentUser.set(null);
    }
  }

  getUserName() {
    return this.currentUser()?.name;
  }

  getUserId() {
    return this.currentUser()?.id;
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('auth_token');
  }
}