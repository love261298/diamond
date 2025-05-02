import { UserService } from './../../../../service/user.service';
import { ChatService } from './../service/chat.service';
import { Component, OnInit, Input, ChangeDetectionStrategy, SimpleChanges, ChangeDetectorRef } from '@angular/core';
import { User } from 'src/app/demo/api/user';

@Component({
    selector: 'app-chat-box',
    templateUrl: './chat-box.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChatBoxComponent implements OnInit {

    messages!: any;
    myId!: string;
    constructor(private chatService: ChatService, private userService: UserService, private cdr: ChangeDetectorRef) { }
    textContent: string = '';

    uploadedFiles: any[] = [];

    emojis = [
        '😀', '😃', '😄', '😁', '😆', '😅', '😂', '🤣', '😇', '😉', '😊', '🙂', '🙃', '😋', '😌', '😍', '🥰', '😘', '😗', '😙', '😚', '🤪', '😜', '😝', '😛',
        '🤑', '😎', '🤓', '🧐', '🤠', '🥳', '🤗', '🤡', '😏', '😶', '😐', '😑', '😒', '🙄', '🤨', '🤔', '🤫', '🤭', '🤥', '😳', '😞', '😟', '😠', '😡', '🤬', '😔',
        '😟', '😠', '😡', '🤬', '😔', '😕', '🙁', '😬', '🥺', '😣', '😖', '😫', '😩', '🥱', '😤', '😮', '😱', '😨', '😰', '😯', '😦', '😧', '😢', '😥', '😪', '🤤'
    ];

    @Input() user!: User;
    @Input() chatId!: string;

    ngOnInit(): void {
        this.userService.getMe().subscribe({
            next: res => this.myId = res.id
        })
    }
    ngOnChanges(changes: SimpleChanges): void {
        if (changes['user'] && changes['user'].currentValue) {
            this.messages = this.user.messages
            console.log(this.user)
        }
    }
    sendMessage() {
        if (this.textContent == '' || this.textContent === ' ') {
            return;
        }
        this.chatService.sendMessage(this.textContent).subscribe({
            next: res => {
                this.messages.push(res)
                this.cdr.markForCheck();                 // Bắt Angular check lại
                this.textContent = '';
            }
        })
    }

    onEmojiSelect(emoji: string) {
        this.textContent += emoji;
    }

    parseDate(timestamp: number) {
        return new Date(timestamp).toTimeString().split(':').slice(0, 2).join(':');
    }
}
