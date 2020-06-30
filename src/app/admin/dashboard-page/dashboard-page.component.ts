import {Component, OnDestroy, OnInit} from '@angular/core';
import {PostService} from "../../shared/services/post.service";
import {Post} from "../../shared/interfaces";
import {Subscription} from "rxjs";
import {DestroySub} from "../shared/DestroySub";
import {takeUntil} from "rxjs/operators";

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss']
})
export class DashboardPageComponent extends DestroySub implements OnInit{

  posts: Post[] = [];
  searchStr: string = "";

  constructor(private postService: PostService) {
    super();
  }

  ngOnInit(): void {
    this.onLoadPosts()
  }

  onLoadPosts() {
     this.postService.getAll()
       .pipe(takeUntil(this.destroy))
       .subscribe(posts => this.posts = posts);
  }

  onDelete(id: string) {
    this.postService.delete(id)
      .pipe(takeUntil(this.destroy))
      .subscribe(() => this.onLoadPosts())
  }

}
