import { Component, OnInit } from '@angular/core';
import { Router, NavigationStart, ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/services/Auth.service';
import { MENU_ITEMS } from './pages-menu';
import { tap } from 'rxjs/operators';

export let browserRefresh = false;

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.scss']
})
export class PagesComponent implements OnInit {
  menu = MENU_ITEMS

  subscription: Subscription;
  isRefresh: boolean;
  jwtHelper: any;
  storageService: any;

  constructor(
    private translate: TranslateService,
    private router: Router,private  route: ActivatedRoute
  ) {
    translate.setDefaultLang("tr-TR");
    translate.use("tr-TR");


    this.subscription = router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        browserRefresh = !router.navigated;
      }
    });
  }
  ngOnInit(): void {


  }

}
