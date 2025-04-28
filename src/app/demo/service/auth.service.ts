import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/app/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly apiUrl = environment.apiUrl

  constructor(private http: HttpClient) { }

  login(body: { email: string, password: string }): Observable<any> {
    return this.http.post<any>(this.apiUrl + "login", body);
  }
  register(body: { name: string, email: string, password: string }): Observable<any> {
    return this.http.post<any>(this.apiUrl + "register", body);
  }
  isLoggedIn(): boolean {
    return !!this.getToken()
  }
  getToken() {
    return localStorage.getItem('token');
  }
  setToken(token: string) {
    localStorage.setItem('token', token);
  }
  getRole() {
    return localStorage.getItem('role');
  }
  setRole(role: string) {
    localStorage.setItem('role', role);
  }
  logout() {
    localStorage.clear();
  }
}
