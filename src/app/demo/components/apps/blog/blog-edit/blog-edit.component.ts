import { Component, ElementRef, OnInit, QueryList, ViewChildren } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Blog } from 'src/app/demo/api/blog';
import { BlogService } from 'src/app/demo/service/blog.service';

@Component({
  templateUrl: './blog-edit.component.html',
  styleUrls: ['./blog-edit.component.scss']
})
export class BlogEditComponent implements OnInit {
  id!: string;
  blog!: Blog;
  constructor(private route: ActivatedRoute, private blogService: BlogService) { }
  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id')?.trim().replace(/^\+/, '') || '';
    this.blogService.getById(this.id!).subscribe({
      next: res => {
        this.blog = res;
      }
    })
  }

  @ViewChildren('buttonEl') buttonEl!: QueryList<ElementRef>;

  image: any;

  objectURL: string = '';

  tags: string[] = ['Software', 'Web'];

  onUpload(event: any) {
    let file = event.files[0];
    file.objectURL = file.objectURL ? file.objectURL : this.objectURL;

    if (!file.objectURL) {
      return;
    }
    else {
      this.image = file;
      this.objectURL = file.objectURL;
    }
  }

  removeImage() {
    this.image = null;
  }

}

