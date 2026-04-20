import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private baseUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  login(data: any) {
    return this.http.post(`${this.baseUrl}/users/login`, data );
  }

  register(data: any) {
    return this.http.post(`${this.baseUrl}/users/register`, data);
  }

  createPet(data: any) {
    return this.http.post(`${this.baseUrl}/pets`, data);
  }

  getPets(userId: string) {
    return this.http.get(`${this.baseUrl}/pets/user/${userId}`);
  }

  getHistory(petId: string) {
    return this.http.get(`${this.baseUrl}/care/${petId}`);
  }

  createCare(data: any) {
  return this.http.post(`${this.baseUrl}/care`, data);
}

getPetById(id: string) {
  return this.http.get(`${this.baseUrl}/pets/${id}`);
}

updatePet(id: string, data: any) {
  return this.http.put(`${this.baseUrl}/pets/${id}`, data);
}

deleteRecord(id: string) {
  return this.http.delete(`${this.baseUrl}/care/${id}`);
}

getUserById(id: string) {
  return this.http.get(`${this.baseUrl}/users/${id}`);
}

getRecordById(petid: string, id: string) {
  return this.http.get(`${this.baseUrl}/care/${petid}/${id}`);
}

updateCare(id: string, data: any) {
  return this.http.put(`${this.baseUrl}/care/${id}`, data);
}

updateUser(id: string, data: any) {
  return this.http.put(`${this.baseUrl}/users/${id}`, data);
}

deletePet(id: string) {
  return this.http.delete(`${this.baseUrl}/pets/${id}`);    
}
}