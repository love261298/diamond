import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/app/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class BlogService {
  private readonly apiUrl = environment.apiUrl
  constructor(private http: HttpClient) { }
  get(): Observable<any> {
    return this.http.get<any>(this.apiUrl + "Blog");
  }
  getById(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}Blog/${id}`);
  }

  creaet(blog: any): Observable<any> {
    return this.http.post<any>(this.apiUrl + "Blog", blog);
  }

  update(blog: any): Observable<any> {
    return this.http.put<any>(this.apiUrl + "Blog", blog);
  }

  delete(id: any): Observable<any> {
    return this.http.delete<any>(this.apiUrl + "Blog", id);
  }
}
