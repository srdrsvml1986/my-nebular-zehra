import { environment } from 'src/environments/environment';
import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, NavigationBehaviorOptions, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { AuthService } from "src/app/auth/services/Auth.service";


@Injectable()
export class LoginGuard implements CanActivate {
    constructor(private router: Router, private authService: AuthService) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
  
        if (this.authService.loggedIn()){
            return true;
        }
         
        window.location=<any>(environment.loginUrl+"?returnUrl="+window.location.pathname)
         
        return false;

    }


}