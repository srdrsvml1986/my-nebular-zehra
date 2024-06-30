import { NbAlertModule, NbButtonModule, NbCardModule, NbCheckboxModule, NbDatepickerModule, NbIconModule, NbInputModule, NbListModule, NbMenuModule, NbProgressBarModule, NbRadioModule, NbSelectModule, NbSpinnerModule, NbTabsetModule, NbToggleModule, NbUserModule } from '@nebular/theme';
import { ThemeModule } from './../@theme/theme.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesRoutingModule } from './pages-routing.module';
import { PagesComponent } from './pages.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UsersComponent } from './users/users.component';
import { TeachersComponent } from './teachers/teachers.component';
import { HttpClient } from '@angular/common/http';
import tr from '@angular/common/locales/tr';
import { RouterModule } from '@angular/router';
import { NbDateFnsDateModule } from '@nebular/date-fns';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { SurveysComponent } from './surveys/surveys.component';
import { SurveyModule } from "survey-angular-ui";
//import { HttpLoaderFactory } from '../app.module';
export function HttpLoaderFactory(http: HttpClient) {
   
  var asd=new TranslateHttpLoader(http, './assets/i18n/', '.json'); 
  return asd;
}
@NgModule({
  declarations: [
    PagesComponent,
    UsersComponent,
    TeachersComponent,
    SurveysComponent
  ],
  imports: [
    PagesRoutingModule,
    CommonModule,
    ThemeModule,
    NbMenuModule,
    NbCardModule,
    NbDatepickerModule,
    FormsModule, 
    ReactiveFormsModule,
    NbProgressBarModule,
    NbCardModule,
    NbTabsetModule,
    NbListModule,
    ThemeModule,   
    NbIconModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    NbAlertModule,
    NbInputModule,
    NbButtonModule,
    NbCheckboxModule,
    NbUserModule,
    NbSelectModule,
    NbSpinnerModule,
    NbToggleModule,
    NbRadioModule,
    NbDatepickerModule,
    NbDateFnsDateModule.forRoot({
      parseOptions: { locale: tr },
      formatOptions: { locale: tr },
    }),
    NgMultiSelectDropDownModule.forRoot(),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory:HttpLoaderFactory, //i18 kullanılacak ise useClass kapatılıp yukarıda bulunan HttpLoaderFactory ve bu satır aktif edilecek
        //useClass: TranslationService,
        deps: [HttpClient]
      }
    }),  
    SurveyModule   
  ]
})
export class PagesModule { }
