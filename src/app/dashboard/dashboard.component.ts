import { Component, OnInit } from '@angular/core';
import { IPost } from '../post.model';
import {PostService} from '../post.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  posts: IPost[] = [];
  constructor(private postService: PostService) { }

  ngOnInit() {
    this.getPopularPosts();
  }

  getPopularPosts(): void{
    this.postService.getPopularPosts()
      .subscribe(posts => {
        this.posts = posts.slice(0, 5);
      });
  }

}
