import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from "@angular/router";
import {Observable} from "rxjs";
import {AuthService} from "../../shared/services/auth.service";


@Injectable ()
export class AuthGuard implements CanActivate{
  constructor(private authServices: AuthService, private router: Router ) {
  }
  canActivate(route: ActivatedRouteSnapshot,state: RouterStateSnapshot)
    : Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    if (this.authServices.isAuthenticated()){
      return true
    }else{
      this.authServices.logOut();
      this.router.navigate(["./admin/login"], {
        queryParams:{loginAgain: true}
      })
    }
  }

}
