import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { catchError, Observable, of, retry, throwError } from 'rxjs';
import { tap } from 'rxjs/operators';
//import { AlertifyService } from 'src/app/@core/project-services/Alertify.service';
import { LocalStorageService } from 'src/app/@core/project-services/local-storage.service';
import { SharedService } from 'src/app/@core/project-services/shared.service';
import { environment } from 'src/environments/environment';
import { TokenModel } from '../model/token-model';


@Injectable({
  providedIn: 'root'
})

export class AuthService {

  userName: string;
  isLoggin: boolean;
  decodedToken: any;
  userToken: string;
  jwtHelper: JwtHelperService = new JwtHelperService();
  claims: string[];

  constructor(private httpClient: HttpClient,
    private storageService: LocalStorageService,
    private router: Router,
    private sharedService: SharedService) {

    //this.setClaims();
  }

  login(loginUser: any): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.append("Content-Type", "application/json")

    return this.httpClient.post<TokenModel>(environment.getApiUrl + "/Auth/login", { ...loginUser, "authenticatorCode": "" }, { headers: headers }).pipe(
      retry(1),
      catchError((error: any) => {
        //console.log(error);
        let errorMsg: string;
        if (error.error instanceof ErrorEvent) {
          errorMsg = `Error: ${error.error.message}`;
        } else {
          errorMsg = this.getServerErrorMessage(error);
        }
        //console.log(errorMsg);
        return throwError(error);
      })
    );
  }
  register(user: any): Observable<any> {

    let headers = new HttpHeaders();
    headers = headers.append("Content-Type", "application/json")

    return this.httpClient.post<TokenModel>(environment.getApiUrl + "/Auth/register", user, { headers: headers }).pipe(
      retry(1),
      catchError((error: any) => {
        //console.log(error);
        let errorMsg: string;
        if (error.error instanceof ErrorEvent) {
          errorMsg = `Error: ${error.error.message}`;
        } else {
          errorMsg = this.getServerErrorMessage(error);
        }
        //console.log(errorMsg);
        return throwError(error);
      })
    )
  }
  setLoginSuccessEvents(data: any) {
    if (data.accessToken.token === undefined || data.accessToken.token === null) {
      this.storageService.setToken(data.token);     
    } else {
      this.storageService.setToken(data.accessToken.token);
    }
    this.storageService.setItem("refreshToken", data?.requiredAuthenticatorType);
    this.storageService.setItem("requiredAuthenticatorType", data.requiredAuthenticatorType);

    //this.claims = data.data.claims;
    var decode = this.storageService.getToken();
    //console.log(decode);

    var propUserName = Object.keys(decode).filter(x => x.endsWith("/name"))[0];
    //console.log(propUserName);
    //var nameidentifier = Object.keys(decode).filter(x => x.endsWith("/nameidentifier"))[0];

    this.userName = decode[propUserName];
    //console.log(this.userName);
    //this.userId=<number>decode[nameidentifier];
    this.sharedService.sendChangeUserNameEvent();
    //this.storageService.setItem('claims', JSON.stringify(this.claims))
    //  if (data.accessToken) { }
    //   else {
    //     //this.alertifyService.warning(data.message);
    //   }
  }
  getUserName(): string {
    return this.userName;
  }

  loggedIn(): boolean {
    //console.log(this.jwtHelper.decodeToken(this.storageService.getToken()));
    if (this.storageService.getToken() === undefined || this.storageService.getToken() === null) {
      return false
    }
    console.log(this.storageService.getToken());

    let isExpired = this.jwtHelper.isTokenExpired(this.storageService.getToken(), -620);
    return !isExpired;
  }

  getCurrentUserId() {

    var decode = this.jwtHelper.decodeToken(this.storageService.getToken());
    //console.log(decode);

    var propUserName = Object.keys(decode).filter(x => x.endsWith("/name"))[0];
    //console.log(propUserName);
    var nameidentifier = Object.keys(decode).filter(x => x.endsWith("/nameidentifier"))[0];

    this.userName = decode[propUserName];
    //console.log(this.userName);
    return <string>decode[nameidentifier];


    //return this.jwtHelper.decodeToken(this.storageService.getToken()).userId;
  }


  private getServerErrorMessage(error: HttpErrorResponse): string {
    switch (error.status) {
      case 404: {
        return `Not Found: ${error.message}`;
      }
      case 403: {
        return `Access Denied: ${error.message}`;
      }
      case 500: {
        return `Internal Server Error: ${error.message}`;
      }
      default: {
        return `Unknown Server Error: ${error.message}`;
      }

    }
  }
  refreshToken() {
    //if (this.storageService.getItem("refreshToken") !== null)
    return this.httpClient
      .get<any>(environment.getApiUrl + "/Auth/RefreshToken")
      .pipe(tap(res => {
        if (res.success) {
          this.storageService.setToken(res.data.token);
          this.storageService.setItem("refreshToken", res.data.refreshToken);
        } else {
          this.signOut()
        }
      }), catchError((error: HttpErrorResponse): Observable<any> => {
        // we expect 404, it's not a failure for us.
        if (error.status === 404) {
          return of(null); // or any other stream like of('') etc.
        }
        this.signOut()
        // other errors we don't know how to handle and throw them further.
        return throwError(error);
      }));
  }
  signOut(): void {
    window.sessionStorage.clear();
    this.storageService.removeToken();
    this.storageService.removeItem("lang")
    this.storageService.removeItem("claims")
    this.storageService.removeItem("refreshToken");
    //console.log("logout çalıştı");

    window.location.reload()
  }
}
