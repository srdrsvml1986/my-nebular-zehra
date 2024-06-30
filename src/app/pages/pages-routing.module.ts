import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { UsersComponent } from './users/users.component';
import { TeachersComponent } from './teachers/teachers.component';
import { LoginGuard } from '../@core/guards/login-guard';
import { SurveysComponent } from './surveys/surveys.component';

const routes: Routes = [{
  path: '',
  component: PagesComponent,
  children: [
    {
      path: 'users',
      component: UsersComponent,pathMatch:'full',canActivate:[LoginGuard]
    },
    {
      path: 'teachers',pathMatch:'full',
      component: TeachersComponent,canActivate:[LoginGuard]
    },
    {
      path: 'survey',pathMatch:'full',
      component: SurveysComponent,canActivate:[LoginGuard]
    },
    {
      path: '',pathMatch:'full',
      redirectTo: 'teachers',
    },   
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {
}
