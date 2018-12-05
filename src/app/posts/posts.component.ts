import { Component, OnInit } from '@angular/core';
import { IPost } from '../models/post.model';
import { PostService} from '../services/post.service';

function htmlToPlainText(text) {
  return text ? String(text).replace(/<^>]+>/gm, '') : '';
}

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {
  posts: IPost[];
  constructor(private postService: PostService) { }

  ngOnInit() {
    this.getPosts();
  }
  getPosts(): void {
    this.postService.getPosts()
      .subscribe(posts => this.posts = posts);
  }

}
