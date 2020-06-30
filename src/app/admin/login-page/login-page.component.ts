import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {User} from "../../shared/interfaces";

import {Router} from "@angular/router";
import {AuthService} from "../../shared/services/auth.service";
import {DestroySub} from "../shared/DestroySub";
import {takeUntil} from "rxjs/operators";

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent extends DestroySub implements OnInit {

  readonly passwordMinLength = 3;
  readonly passwordMaxLength = 20;

  constructor(public autService: AuthService, private router: Router) {
    super();
  }

  form: FormGroup;
  isSubmitted: boolean = false;

  get emailCtrl(): FormControl {
    return this.form.get('email') as FormControl
  }

  get passwordCtrl() {
    return this.form.get('password')
  }

  get isEmailInvalid(): boolean {
    return this.emailCtrl.touched && this.emailCtrl.invalid
  }

  get isPasswordInvalid(): boolean {
    return this.passwordCtrl.touched && this.passwordCtrl.invalid
  }


  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl("", [
        Validators.required,
        Validators.email
      ]),
      password: new FormControl("", [
          Validators.required,
          Validators.minLength(this.passwordMinLength),
          Validators.maxLength(this.passwordMaxLength)
        ]
      )
    })
  }

  submit() {
    if (this.form.invalid) {
      return;
    }
    const {password, email,} = this.form.value;
    const user: User = {
      password,
      email,
      returnSecureToken: true,
    };
    console.log(user);
    this.isSubmitted = true;
    this.autService.logIn(user)
      .pipe(takeUntil(this.destroy))
      .subscribe(() => {
        this.form.reset();
        this.router.navigate(['/admin/dashboard']);
        this.isSubmitted = false;
      }, () => {
        this.isSubmitted = false;
      })
  }
}
