import { UserService } from './../../../../service/user.service';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/demo/api/user';

@Component({
  selector: 'app-chat-sidebar',
  templateUrl: './chat-sidebar.component.html'
})
export class ChatSidebarComponent implements OnInit {

  searchValue: string = '';

  users: User[] = [];
  me!: User;
  filteredUsers: User[] = [];

  constructor(private userService: UserService) { }


  ngOnInit(): void {
    this.userService.getMe().subscribe({
      next: res => {
        this.me = res;
      },
      error: err => console.log(err)
    })
    this.userService.get().subscribe({
      next: res => {
        this.users = res
        this.filteredUsers = res;
      }
    })
  }

  filter() {
    let filtered: User[] = [];
    for (let i = 0; i < this.users.length; i++) {
      let user = this.users[i];
      if (user.name.toLowerCase().indexOf(this.searchValue.toLowerCase()) == 0) {
        filtered.push(user)
      }
    }

    this.filteredUsers = [...filtered];
  }

}
