import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { LocalStorageService } from 'src/app/@core/project-services/local-storage.service';
import { environment } from 'src/environments/environment';
import { AuthService } from './Auth.service';

const TOKEN_KEY = 'auth-token';
const REFRESHTOKEN_KEY = 'auth-refreshtoken';
const USER_KEY = 'auth-user';
@Injectable({
  providedIn: 'root'
})
export class TokenService {


  constructor(private httpClient: HttpClient, private storageService: LocalStorageService) { }

  refreshToken() {
    if (this.storageService.getItem("refreshToken") !== null)
      return this.httpClient
        .post<any>(environment.getApiUrl + "/Auth/Refresh-Token", { refreshToken: this.storageService.getItem("refreshToken") })
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

  public saveToken(token: string): void {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);

    const user = this.getUser();
    if (user.id) {
      this.saveUser({ ...user, accessToken: token });
    }
  }

  public getToken(): string | null {
    return window.sessionStorage.getItem(TOKEN_KEY);
  }

  public saveRefreshToken(token: string): void {
    window.sessionStorage.removeItem(REFRESHTOKEN_KEY);
    window.sessionStorage.setItem(REFRESHTOKEN_KEY, token);
  }

  public getRefreshToken(): string | null {
    return window.sessionStorage.getItem(REFRESHTOKEN_KEY);
  }

  public saveUser(user: any): void {
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  public getUser(): any {
    const user = window.sessionStorage.getItem(USER_KEY);
    if (user) {
      return JSON.parse(user);
    }

    return {};
  }
}
