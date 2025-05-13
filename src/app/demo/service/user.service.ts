import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/app/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private readonly apiUrl = environment.apiUrl

  constructor(private http: HttpClient) { }
  get(): Observable<any> {
    return this.http.get<any>(this.apiUrl + "Users");
  }
  
  getById(id: any): Observable<any> {
    return this.http.get<any>(this.apiUrl + "Users/" + id);
  }

  getMe(): Observable<any> {
    return this.http.get<any>(this.apiUrl + "Users/me");
  }

  creaet(user: any): Observable<any> {
    return this.http.post<any>(this.apiUrl + "Users", user);
  }

  update(user: any): Observable<any> {
    return this.http.put<any>(this.apiUrl + "Users", user);
  }

  delete(id: any): Observable<any> {
    return this.http.delete<any>(this.apiUrl + "Users", id);
  }

}
