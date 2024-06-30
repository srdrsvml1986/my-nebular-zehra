import { LoginComponent } from './login/login.component';
import { AuthRoutingModule} from './auth-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NbCardModule, NbIconModule, NbAlertModule, NbInputModule, NbButtonModule, NbCheckboxModule } from '@nebular/theme';
import { ThemeModule } from 'src/app/@theme/theme.module';
import { AuthComponent } from './auth.component';
import { RegisterComponent } from './register/register.component';
import { HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslationService } from '../@core/project-services/Translation.service';

export function tokenGetter() {
  return localStorage.getItem("token");
}


@NgModule({
  declarations: [AuthComponent,LoginComponent, RegisterComponent],
  imports: [
    AuthRoutingModule,
    NbCardModule,
    ThemeModule,   
    NbIconModule,
    CommonModule,
    FormsModule,
    RouterModule,
    NbAlertModule,
    NbInputModule,
    NbButtonModule,
    NbCheckboxModule,    
    TranslateModule.forChild({
      loader: {
          provide: TranslateLoader,
          //useFactory:layoutHttpLoaderFactory,
          useClass: TranslationService,
          deps: [HttpClient]
      }
  })
  ],
  providers: [],
  schemas: [],
})
export class AuthModule { }
