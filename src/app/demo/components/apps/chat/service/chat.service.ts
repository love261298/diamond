import { CommentService } from './../../../../service/comment.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Message } from 'src/app/demo/api/message';
import { User } from 'src/app/demo/api/user';
import { environment } from 'src/app/environments/environment.development';

@Injectable()
export class ChatService {
  private readonly apiUrl = environment.apiUrl
  _activeUser!: User;
  private activeUser = new BehaviorSubject<User | null>(this._activeUser);
  ChatId!: string
  activeUser$ = this.activeUser.asObservable();

  constructor(private http: HttpClient, private commentService: CommentService) { }

  changeActiveChat(user: User) {
    this._activeUser = user;
    this.create(user.id).subscribe({
      next: res => {
        this._activeUser.messages = res.comment;
        this.ChatId = res.id;
        this.activeUser.next(this._activeUser);
      }
    })
  }

  create(partnerId: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}Chat?partnerId=${partnerId}`, {});
  }
  sendMessage(content: string): Observable<any> {
    const body = {
      ChatId : this.ChatId,
      description: content
    }
    return this.http.post<any>(`${this.apiUrl}Comment`, body)
  }
}
