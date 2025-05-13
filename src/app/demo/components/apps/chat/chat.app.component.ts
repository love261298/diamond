import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { User } from 'src/app/demo/api/user';
import { ChatService } from './service/chat.service';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/demo/service/user.service';

@Component({
  templateUrl: './chat.app.component.html'
})
export class ChatAppComponent implements OnInit, OnDestroy {

  subscription!: Subscription;

  activeUser!: User;
  constructor(private chatService: ChatService, private route: ActivatedRoute, private userService: UserService) {
    this.subscription = this.chatService.activeUser$.subscribe(data => {
      if (data) {
        this.activeUser = data;
        console.log(data)
      }
    });
  }
  getMessage(){}
  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.userService.getById(params['id']).subscribe({
        next: res => this.chatService.changeActiveChat(res)
      })
    });
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
