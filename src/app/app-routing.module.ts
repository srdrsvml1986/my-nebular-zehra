import { LoginComponent } from './auth/login/login.component';
import { NgModule } from '@angular/core';
import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { LoginGuard } from './@core/guards/login-guard';

const routes: Routes = [
  {
    path: 'pages',
    loadChildren: () => import('./pages/pages.module')
      .then(m => m.PagesModule), //canActivate: [LoginGuard]
  }, 
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module')
      .then(m => m.AuthModule), canActivate: []
  },     
  { path: '',  redirectTo: 'pages' ,pathMatch:'full'},
  { path: '**', redirectTo: 'pages',pathMatch:'full' },
  
  
];
const config: ExtraOptions = {
  useHash: false,
  enableTracing: false,// <== this setting should not be enabled in prod
  // <== bu ayar prod modunda etkinleştirilmemelidir
};

@NgModule({
  imports: [RouterModule.forRoot(routes,config)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
