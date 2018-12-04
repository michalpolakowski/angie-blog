import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { IPost } from '../post.model';
import { CommentService } from './comment.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

const HttpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json'})
};
@Injectable({
  providedIn: 'root'
})
export class PostService {
  private postsUrl = 'http://127.0.0.1:8000/api/posts';
  constructor(
    private http: HttpClient,
    private commentService: CommentService) { }
  private log(comment: string) {
    console.log(`PostService: ${comment}`);
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      this.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }

  getPosts(): Observable<Array<any>> {
    return this.http.get<any>(this.postsUrl)
      .pipe(
        tap(posts => this.log('fetched posts')),
        map( res => {
          return res.results;
        } ),
        catchError(this.handleError('getPosts', []))
      );
  }

  getPopularPosts(): Observable<Array<any>> {
    return this.http.get<any>(`${this.postsUrl}/most_popular/`)
      .pipe(
        tap(posts => this.log('fetched most popular posts')),
        map( res => {
          return res.results;
        }),
        catchError(this.handleError('getPopularPosts', []))
      );
  }

  getPost(pk: number): Observable<any> {
    const url = `${this.postsUrl}/${pk}`;
    return this.http.get<any>(url).pipe(
      tap(() => this.log(`fetched post id=${pk}`)),

    );
  }

  updatePost(post: IPost, pk: Number): Observable<any> {
    const updateUrl = `${this.postsUrl}/${pk}/`;
    return this.http.put(updateUrl, post, HttpOptions);
  }
}
