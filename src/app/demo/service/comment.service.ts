import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/app/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  private readonly apiUrl = environment.apiUrl

  constructor(private http: HttpClient) { }
  get(): Observable<any> {
    return this.http.get<any>(this.apiUrl + "Comment");
  }

  creaet(comment: any): Observable<any> {
    return this.http.post<any>(this.apiUrl + "Comment", comment);
  }

  update(comment: any): Observable<any> {
    return this.http.put<any>(this.apiUrl + "Comment", comment);
  }

  delete(id: any): Observable<any> {
    return this.http.delete<any>(this.apiUrl + "Comment", id);
  }

}
