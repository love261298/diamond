import { Component, Input } from '@angular/core';
import { CommentService } from 'src/app/demo/service/comment.service';

@Component({
  selector: 'app-new-comment',
  templateUrl: './new-comment.component.html'
})
export class NewCommentComponent {
  constructor(private commentService: CommentService) { }
  description!: string
  @Input() blogId!: string;
  onSubmit() {
    if (!this.description || this.description.trim() === '') return;
    const comment = {
      blogId: this.blogId,
      description: this.description
    }
    this.commentService.creaet(comment).subscribe({
      next: res => console.log(res),
      error: err => console.log(err)
    })
  }
}
