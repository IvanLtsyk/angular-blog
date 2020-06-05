import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {FbAuthResponse, User} from "../../shared/interfaces";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {tap} from "rxjs/operators";

const enum storageItem {
  fbToken = "fbToken",
  expiresTokenDate = "expiresTokenDate",
}

@Injectable()
export class AuthService {

  get token(): string {
    const expDate = new Date(localStorage.getItem(storageItem.expiresTokenDate));
    if (expDate <= new Date()) {
      this.logOut();
      return null;
    }

    return localStorage.getItem(storageItem.fbToken);
  };

  constructor(private http: HttpClient) {
  }

  logIn(user: User): Observable<any> {
    return this.http.post(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.apiKey}`, user)
      .pipe(
        tap(this.setToken)
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
    console.log(response)
    const expDate = new Date(new Date().getTime() + Number(response.expiresIn) * 1000);
    localStorage.setItem(storageItem.fbToken, response.idToken);
    localStorage.setItem(storageItem.expiresTokenDate, expDate.toString());
  }
}
