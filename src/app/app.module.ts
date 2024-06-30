import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NbDatepickerModule, NbChatModule, NbDialogModule, NbMenuModule, NbSidebarModule, NbToastrModule, NbWindowModule, NbContextMenuModule, NbLayoutModule, NbThemeModule } from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { ThemeModule } from './@theme/theme.module';
import { CoreModule } from './@core/core.module';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslationService } from './@core/project-services/Translation.service';
import { LoginGuard } from './@core/guards/login-guard';
import { AuthInterceptorService } from './@core/interceptors/auth-interceptor.service';
import { HttpEntityRepositoryService } from './@core/project-services/http-entity-repository.service';
import { ClaimsGuard } from './auth/guards/claims-guard';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NbDateFnsDateModule } from '@nebular/date-fns';
import { tr } from 'date-fns/locale';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { ScrollingModule } from '@angular/cdk/scrolling';

// i18 kullanıclak ise aşağıdaki metod aktif edilecek

 export function HttpLoaderFactory(http: HttpClient) {
   
   var asd=new TranslateHttpLoader(http, './assets/i18n/', '.json'); 
   return asd;
 }

export function tokenGetter() {
  return localStorage.getItem("token");
}
 
@NgModule({
  declarations: [
    AppComponent,    
    ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    ScrollingModule,
    BrowserModule,
    NbThemeModule.forRoot({ name: 'default' }),
    NbLayoutModule,
    NbEvaIconsModule,
    NbSidebarModule.forRoot(),
    NbMenuModule.forRoot(),    
    NbDialogModule.forRoot(),
    NbWindowModule.forRoot(),
    NbToastrModule.forRoot(),
    NbDatepickerModule.forRoot(),
    NbDateFnsDateModule.forRoot({
      parseOptions: { locale: tr },
      formatOptions: { locale: tr },
    }),
    NgMultiSelectDropDownModule.forRoot(),
    NbChatModule.forRoot({
      messageGoogleMapKey: 'AIzaSyA_wNuCzia92MAmdLRzmqitRGvCF7wCZPY',
    }),   
    CoreModule.forRoot(),
    ThemeModule.forRoot(),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory:HttpLoaderFactory, //i18 kullanılacak ise useClass kapatılıp yukarıda bulunan HttpLoaderFactory ve bu satır aktif edilecek
        //useClass: TranslationService,
        deps: [HttpClient]
      }
    }), 
  ],
  providers: [ 
    LoginGuard, ClaimsGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true,
    },    
    HttpEntityRepositoryService,   
      
  ],
  bootstrap: [AppComponent],
  schemas: [],
})
export class AppModule { }
