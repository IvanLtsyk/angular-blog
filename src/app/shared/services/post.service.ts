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

}
