import { MENU_ITEMS } from './../../pages/pages-menu';
import { environment } from 'src/environments/environment';
import { Injectable } from "@angular/core";
import { ActivatedRoute, ActivatedRouteSnapshot, CanActivate, NavigationBehaviorOptions, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { AuthService } from "src/app/auth/services/Auth.service";
export interface CLAIMSMENU { url: string, allowLink: boolean }

@Injectable()
export class ClaimsGuard implements CanActivate {
    claimsMenu: CLAIMSMENU[] = []
    returnUrl = ''   
    allClaims=[]
    constructor(private router: Router, private route: ActivatedRoute, private authService: AuthService) {
    }
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        // console.log(this.route);
        // console.log(route);
        // console.log(state);
        if (!this.authService.loggedIn()) {
            window.location = <any>(environment.loginUrl + "?returnUrl=" + state.url)
            
            // this.router.navigateByUrl(environment.loginUrl + "?returnUrl=" +state.url )
            // console.log(3333333333333);
            // console.log(state.url);            
        }
        //console.log(5555555555555);
        
        // this.allClaims=this.authService.getClaims()
        // let items = MENU_ITEMS
        // items.map((menu, i) => {
        //     if (menu.title === 'Projects') {
        //         menu.children.map((child, i) => {
        //             switch (child.link) {
        //                 case '/pages/projects/users':
        //                     let allowLink = this.authService.claimsGuard(this.allClaims.filter(v => { return v.indexOf('User') > -1 }))
        //                     this.claimsMenu.push({ url: child.link, allowLink: allowLink })
        //                     break;
        //                 case '/pages/projects/prays':                         
        //                     this.claimsMenu.push({ url: child.link, allowLink: 
        //                         this.authService.claimsGuard(this.allClaims.filter(v => { return v.indexOf('Pray') > -1 })) })
        //                     break;
        //                     case '/pages/projects/ProfilFiyatlari':                         
        //                     this.claimsMenu.push({ url: child.link, allowLink: 
        //                         this.authService.claimsGuard(this.allClaims.filter(v => { return v.indexOf('ProfilFiyatlari') > -1 })) })
        //                     break;
        //                 default:
        //                     break;
        //             }
        //         })
        //     }
        // })
        // // console.log(this.route);
        // // console.log(route);
        // // console.log(state);
        this.returnUrl = this.route.snapshot.queryParamMap.get('returnUrl')
        // return this.claimsMenu.some((menu) => {
        //    // console.log(menu.url);
        //     if (state.url === menu.url || this.returnUrl === menu.url) {
        //         // console.log(menu.url);
        //         // console.log(menu.allowLink);
        //         return menu.allowLink;
        //     }
        // })
        return true
    }
}

