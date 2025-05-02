import { Component, OnInit, Input } from '@angular/core';
import { Message } from 'src/app/demo/api/message';
import { User } from 'src/app/demo/api/user';
import { ChatService } from '../service/chat.service';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html'
})
export class UserCardComponent implements OnInit {

  @Input() user!: any;

  lastMessage!: Message;

  constructor(private chatService: ChatService) { }
  getDateString(d: Date): any {
    const date = new Date(d)
    return date.toISOString().slice(0, 10);
  }
  ngOnInit(): void {
  }

  changeView(user: User) {
    this.chatService.changeActiveChat(user);
  }
}
