import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  comments: string[] = [];
  add(message: string) {
    this.comments.push(message);
  }
  clear() {
    this.comments = [];
  }
}
