import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {FbAuthResponse, User} from "../../shared/interfaces";
import {Observable, Subject, throwError} from "rxjs";
import {environment} from "../../../environments/environment";
import {catchError, tap} from "rxjs/operators";
import {FbErrorCodeEnum} from "../../shared/enumes";

const enum storageItem {
  fbToken = "fbToken",
  expiresTokenDate = "expiresTokenDate",
}

@Injectable()
export class AuthService {

  error$ = new Subject();
  constructor(private http: HttpClient) {
  }

  get token(): string {
    const expDate = new Date(localStorage.getItem(storageItem.expiresTokenDate));
    if (expDate <= new Date()) {
      this.logOut();
      return null;
    }

    return localStorage.getItem(storageItem.fbToken);
  };

  logIn(user: User): Observable<any> {
    return this.http.post(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.apiKey}`, user)
      .pipe(
        tap(this.setToken),
        catchError((err: HttpErrorResponse) => {
          this.error$.next(FbErrorCodeEnum[err.error.error.message]);
          return throwError(err)
        })
      )
  }

  logOut() {
    this.setToken(null);
  }

  isAuthenticated(): boolean {
    return !!this.token
  }

  private setToken(response: FbAuthResponse | null) {
    if (!response) {
      localStorage.clear();
      return;
    }
    console.log(response);
    const expDate = new Date(new Date().getTime() + Number(response.expiresIn) * 1000);
    localStorage.setItem(storageItem.fbToken, response.idToken);
    localStorage.setItem(storageItem.expiresTokenDate, expDate.toString());
  }

}
