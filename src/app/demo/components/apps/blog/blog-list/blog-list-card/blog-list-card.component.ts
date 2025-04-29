import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Blog } from 'src/app/demo/api/blog';

@Component({
  selector: 'app-blog-list-card',
  templateUrl: './blog-list-card.component.html',
})
export class BlogListCardComponent implements OnInit {

  @Input() blog!: any;

  constructor(private router: Router) {
  }
  ngOnInit(): void {
  }

  navigateToDetail(): void {
    console.log(`/apps/blog/detail/${this.blog.id}`)
    this.router.navigateByUrl(`/apps/blog/detail/${this.blog.id}`);
  }
}
