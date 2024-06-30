import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NbRegisterComponent } from '@nebular/auth';
import { tap, catchError, of } from 'rxjs';
import { defaultSettings } from '../options';
import { AuthService } from '../services/Auth.service';
import { User } from 'src/app/@core/models/user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})

export class RegisterComponent extends NbRegisterComponent implements OnInit {

  newUser:User;

  constructor(private auth: AuthService, cd: ChangeDetectorRef, router: Router) {
    super(null, defaultSettings, cd, router)
    this.showMessages = { 'success': null, 'error': null }
    this.showMessages = this.getConfigValue('forms.register.showMessages');
    //this.rePass.value
  }
  ngOnInit(): void {
this.newUser={firstName:"",lastName:"",email:"",password:"",id:""
}
  }
  @ViewChild("rePass") rePass: HTMLInputElement

  override register() {
    this.errors = [];
    this.messages = [];
    this.submitted = true;

    this.newUser.email=this.user.email
    this.newUser.password=this.user.password

    this.auth.register(this.newUser).subscribe(data => {
      //console.log(data) //sunucudan gelen gerçek data 
        this.auth.setLoginSuccessEvents(data)
        this.showMessages = { 'success': 'true' }
        this.messages = [data.message]
     
      setTimeout(() => {
        return this.router.navigateByUrl("/");
      }, this.redirectDelay);
      this.submitted = false;
      this.cd.detectChanges();
    },
      error => {
        this.showMessages = { 'error': 'true' }
        this.errors = [error.message];
        this.submitted = false;
        this.cd.detectChanges();
      });
  }
}
