import { Component, OnInit, Input } from '@angular/core';
import { Post } from '../post';
import { ActivatedRoute } from '@angular/router';
import { PostService } from '../post.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.css']
})
export class PostDetailComponent implements OnInit {
  @Input() post: Post;
  constructor(
    private route: ActivatedRoute,
    private postService: PostService,
    private location: Location
  ) { }

  ngOnInit() {
    this.getPost();
  }
  getPost(): void {
    const pk = +this.route.snapshot.paramMap.get('pk');
    this.postService.getPost(pk)
      .subscribe((post => this.post = post));
  }
  goBack(): void {
    this.location.back();
  }

}
