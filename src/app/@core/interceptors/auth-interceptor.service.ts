import { AuthService } from 'src/app/auth/services/Auth.service';
import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from "rxjs";
import { catchError, filter, switchMap, take } from 'rxjs/operators';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {
  jwtHelper: any;
  storageService: any;
  constructor( private auth: AuthService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    req = this.addToken(req);
    //return next.handle(req)
    return next.handle(req).pipe(
      catchError((error) => {
        //console.log(error);
        if ((error instanceof HttpErrorResponse && error.status === 500) ||
          (error instanceof HttpErrorResponse && error.status === 401)) {
          if (isOut(req)) {
            return next.handle(req);
          }
          return this.handle401Error(req, next);
        }
        else {
          return next.handle(req);
        }
      })
    )
  }

  private addToken(req: HttpRequest<any>) {
    if (!isOut(req)) {

      console.log(req);

      var lang = localStorage.getItem("lang") || "tr-TR"
      //TODO: Refactoring needed    
      if (req.url.indexOf("login") > -1) {
        return req.clone({
          setHeaders: {
            'Accept-Language': lang,
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          },
          //responseType: req.method == "DELETE" ? "text" : req.responseType

          //responseType: req.method == "DELETE" || req.method == "UPDATE" || req.method == "PUT" ? "text" : req.responseType

        });
      } else {
        return req.clone({
          setHeaders: {
            'Accept-Language': lang,
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          },
          //responseType: req.method == "DELETE" ? "text" : req.responseType

          //responseType: req.method == "DELETE" || req.method == "UPDATE" || req.method == "PUT" || req.method == "POST" ? "text" : req.responseType

        });
      }

    }
    // origin: http://localhost:4200
    // pragma: no-cache
    // referer: http://localhost:4200/


    // return req.clone({
    //       setHeaders: {
    //         'origin': "https://serdarsevimli.com/",
    //         'referer': "https://serdarsevimli.com/"
    //       },

    //       responseType: "json"

    //     })
    return req.clone({
      setHeaders: {
        'Access-Control-Allow-Origin': "http://localhost:4200",
      },

      responseType: "text"

    })
  }
  private isRefreshing = false;
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  private handle401Error(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if (!this.isRefreshing) {
      this.isRefreshing = true;
      this.refreshTokenSubject.next(null);
      let refreshToken = this.auth.refreshToken();

      if (refreshToken !== undefined) {
        return refreshToken.pipe(
          switchMap((token: any) => {
            console.log("Token Yenilendi.")
            this.isRefreshing = false;
            this.refreshTokenSubject.next(token.data.token);
            //window.location.reload()
            return next.handle(this.addToken(req))
          }));
      } else {
        if (window.location.pathname.indexOf("login") > -1) {

        } else {
          this.auth.signOut()
        }


        return next.handle(req)
      }
    }
    else {
      return this.refreshTokenSubject.pipe(
        filter(token => token != null),
        take(1),
        switchMap(jwt => {
          return next.handle(this.addToken(req));
        })
      )
    }
  }

}
function isOut(req: any) {
  return !(req.url.indexOf("serdarsevimli") > -1 ||req.url.indexOf("cigdem") > -1 || req.url.indexOf("localhost") > -1);
}

