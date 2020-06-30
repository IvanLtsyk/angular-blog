import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {FbCreateResponse, Post} from "../interfaces";
import {environment} from "../../../environments/environment";
import {map} from "rxjs/operators";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private  http: HttpClient) {
  }

  crete(post: Post): Observable<Post> {
    return this.http.post(`${environment.fbDbUrl}/posts.json`, post)
      .pipe(
        map((response: FbCreateResponse) => ({...post, id: response.name, date: new Date(post.date)})
        )
      )
  }

  getAll(): Observable<Post[]> {
    return this.http.get(`${environment.fbDbUrl}/posts.json`)
      .pipe(
        map((response: { [key: string]: any }) => (
            Object.keys(response)
              .map(key => ({
                  ...response[key],
                  id: key,
                  date: new Date(response[key].date)
                })
              )
          )
        )
      )
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${environment.fbDbUrl}/posts/${id}.json`)
  }

  getBayId(id: string): Observable<Post> {
    console.log(id);
    return this.http.get(`${environment.fbDbUrl}/posts/${id}.json`)
      .pipe(
        map((post: Post) => {
          return {
            ...post,
            id,
            date: new Date(post.date)
          }
        })
      )
  }

  update(post: Post): Observable<Post> {
    return this.http.patch<Post>(`${environment.fbDbUrl}/posts/${post.id}.json`, post)
  }
}
