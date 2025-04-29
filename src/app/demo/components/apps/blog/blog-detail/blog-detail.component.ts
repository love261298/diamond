import { BlogService } from './../../../../service/blog.service';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { UserService } from './../../../../service/user.service';
import { Component, OnInit } from '@angular/core';
import { Blog, Comment } from 'src/app/demo/api/blog';

@Component({
  templateUrl: './blog-detail.component.html'
})
export class BlogDetailComponent implements OnInit {
  blog!: Blog
  id!: string
  comments: Comment[] = []
  constructor(private userService: UserService, private route: ActivatedRoute, private blogService: BlogService, private router: Router) { }
  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id')?.trim().replace(/^\+/, '') || '';
    this.blogService.getById(this.id!).subscribe({
      next: res => {
        this.blog = res;
        this.comments = res.comment;
      }
    })

    // this.userService.get().subscribe({
    //     next: res => {
    //         console.log(res)
    //         let count = 0;
    //         res.map((user : any) => {
    //             if(user.image === null){
    //                 user.image = this.comments[count].image;
    //                 this.userService.update(user).subscribe(res => console.log("ok"))
    //                 count++;
    //                 if(count == this.comments.length) count = 0;
    //             }
    //         })
    //     },
    //     error: err => {

    //     }
    // })
  }
  navigateToEdit() {
    this.router.navigateByUrl(`/apps/blog/edit/${this.id}`);
  }
  // comments: Comment[] = [
  //     {
  //         image: "assets/demo/images/avatar/circle/avatar-f-3@2x.png",
  //         name: "Courtney Henry",
  //         date: "03 February 2022",
  //         description: "Reprehenderit ut voluptas sapiente ratione nostrum est."
  //     },
  //     {
  //         image: "assets/demo/images/avatar/circle/avatar-f-1@2x.png",
  //         name: "Esther Howard",
  //         date: "03 February 2022",
  //         description: "How likely are you to recommend our company to your friends and family ?"
  //     },
  //     {
  //         image: "assets/demo/images/avatar/circle/avatar-f-4@2x.png",
  //         name: "Darlene Robertson",
  //         date: "03 February 2022",
  //         description: "Quo quia sit nihil nemo doloremque et."
  //     },
  //     {
  //         image: "assets/demo/images/avatar/circle/avatar-f-5@2x.png",
  //         name: "Esther Howard",
  //         date: "03 February 2022",
  //         description: "How likely are you to recommend our company to your friends and family ?"
  //     }
  // ];

}
