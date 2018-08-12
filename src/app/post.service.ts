import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Post } from './post';
import { CommentService } from './comment.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private postsUrl = 'http://127.0.0.1:8000/api/posts';
  constructor(
    private http: HttpClient,
    private commentService: CommentService) { }
  private log(comment: string) {
    this.commentService.add(`PostService: ${comment}`);
  }
  private handleError<T> (operation = 'operation', result?:T){
    return (error: any): Observable<T> => {
      console.error(error);
      this.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
  getPosts(): Observable<any>{
    return this.http.get<any>(this.postsUrl)
      .pipe(
        tap(posts => this.log('fetched heroes')),
        map( res => {
          return res.results;
        } ),
        catchError(this.handleError('getHeroes', []))
      );
  }
  getPost(pk: number): Observable<any> {
    const url = `${this.postsUrl}/${pk}`;
    return this.http.get<any>(url).pipe(
      tap(_ => this.log(`fetched hero id=${pk}`)),

    )
  }

}
