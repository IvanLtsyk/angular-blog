import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Post} from "../../shared/interfaces";
import {PostService} from "../../shared/services/post.service";

@Component({
  selector: 'app-create-page',
  templateUrl: './create-page.component.html',
  styleUrls: ['./create-page.component.scss']
})
export class CreatePageComponent implements OnInit {
  form: FormGroup;

  constructor(private postService: PostService) {
    this.form = new FormGroup({
      title: new FormControl("", Validators.required),
      author: new FormControl("", Validators.required),
      text: new FormControl("", Validators.required),
    })
  }

  get titleCtrl(): FormControl {
    return this.form.get("title") as FormControl
  }

  get authorCtrl(): FormControl {
    return this.form.get("author") as FormControl
  }

  get contentCtrl(): FormControl {
    return this.form.get("text") as FormControl
  }

  ngOnInit(): void {
  }

  isTitleInvalid() {
    return this.titleCtrl.invalid && this.titleCtrl.touched;
  }

  isAuthorInvalid() {
    return this.authorCtrl.invalid && this.authorCtrl.touched;
  }

  isContentInvalid() {
    return this.contentCtrl.invalid && this.contentCtrl.touched;
  }

  submit() {
    if (this.form.invalid) {
      return;
    }

    const {title, author, text} = this.form.value;
    const post: Post = {
      title,
      author,
      text,
      date: new Date()
    };

    this.postService.crete(post).subscribe(m => {
      this.form.reset()
    })
  }

}
