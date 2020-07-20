import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from "@angular/router";
import {PostService} from "../../shared/services/post.service";
import {switchMap, takeUntil} from "rxjs/operators";
import {Post} from "../../shared/interfaces";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {DestroySub} from "../shared/DestroySub";
import {AlertService} from "../services/AlertService";

@Component({
  selector: 'app-edit-page',
  templateUrl: './edit-page.component.html',
  styleUrls: ['./edit-page.component.scss']
})
export class EditPageComponent extends DestroySub implements OnInit {

  constructor(private router: ActivatedRoute,
              private postService: PostService,
              private alertService: AlertService) {
    super()
  }

  form: FormGroup;
  post: Post;
  isLoading: boolean;

  get textCtrl(): FormControl {
    return this.form.get("text") as FormControl
  }

  get titleCtrl(): FormControl {
    return this.form.get("title") as FormControl
  }

  get isInvalidText(): boolean {
    return this.textCtrl.touched && this.textCtrl.invalid;
  }

  get isInvalidTitle(): boolean {
    return this.titleCtrl.touched && this.titleCtrl.invalid;
  }

  ngOnInit(): void {
    this.loadData()
  }

  loadData() {
    this.router.params
      .pipe(
        switchMap((params: Params) => {
          this.isLoading = true;
          return this.postService.getBayId(params["id"])
        })
      )
      .subscribe((post: Post) => {
        this.isLoading = false;
        this.post = post;
        this.form = new FormGroup({
          title: new FormControl(post.title, Validators.required),
          text: new FormControl(post.text, Validators.required),
        })
      })
  }

  submit() {
    if (this.form.invalid) {
      return
    }
    this.isLoading = true;
    this.postService.update({
      ...this.post,
      text: this.form.value.text,
      title: this.form.value.title
    }).pipe(takeUntil(this.destroy))
      .subscribe(() => {
        this.alertService.success("Updated post!");
        this.isLoading = false;
        this.loadData();
      })
  }


}
