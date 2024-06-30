import { HttpClient } from '@angular/common/http';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NbLoginComponent } from '@nebular/auth';
import { TranslateService } from '@ngx-translate/core';
import { LookUp } from 'src/app/@core/models/LookUp';
import { LocalStorageService } from 'src/app/@core/project-services/local-storage.service';
import { environment } from 'src/environments/environment';
import { LoginUser } from '../model/login-user';
import { defaultSettings } from '../options';
import { AuthService } from '../services/Auth.service';

@Component({
  selector: 'app-login',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './login.component.html',
  styleUrls: ['./login.css']
})
export class LoginComponent extends NbLoginComponent implements OnInit {
  username: string = "";
  loginUser: LoginUser = new LoginUser();
  langugelookUp: LookUp[];
  returnUrl: any;

  constructor(private auth: AuthService,
    private storageService: LocalStorageService,
    public translateService: TranslateService,
    cd: ChangeDetectorRef, router: Router, private route: ActivatedRoute) {
    super(null, defaultSettings, cd, router)
  }
  ngOnInit(): void {
    this.username = this.auth.userName;
    // this.httpClient.get<LookUp[]>(environment.getApiUrl + "/languages/codes").subscribe(data => {
    //   this.langugelookUp = data;
    // });
    this.errors = [];
    this.messages = [];
    this.submitted = false;
    this.returnUrl = this.route.snapshot.queryParamMap.get('returnUrl')
  }

  getUserName() {
    return this.username;
  }

  override login() {
    this.errors = [];
    this.messages = [];
    this.submitted = true;

    this.auth.login(this.user).subscribe(
      (data) => {
        console.log(data) //sunucudan gelen gerçek data        

        this.auth.setLoginSuccessEvents(data)
        this.showMessages = { 'Başarılı': 'true' }
        this.messages = [data]

        setTimeout(() => {
          return this.router.navigateByUrl(this.returnUrl);
        }, this.redirectDelay);
        // if (data.accessToken) {  }
        //   else {
        //     this.showMessages = { 'error': 'true' }
        //     if (data.message) {
        //       this.errors = [data.message]

        //     } else {
        //       this.errors = [data.error]
        //     }
        //   }
        this.submitted = false;
        setTimeout(() => {
          this.submitted = true;
        }, 5000);
        this.cd.detectChanges();

      }, (error) => {
        console.log(error);
        this.showMessages = { 'error': 'true' }
        if (error) {
          this.errors = [error];
        } else {
          this.errors = [error];
        }
        this.submitted = false;
        setTimeout(() => {
          this.submitted = true;
        }, 5000);
        this.cd.detectChanges();
      }
    );
  }

  logOut() {
    this.storageService.removeToken();
    this.storageService.removeItem("lang");
  }

  changeLang(lang: any) {
    localStorage.setItem("lang", lang.value);
    this.translateService.use(lang.value);
  }

}
