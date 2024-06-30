import { ActivatedRoute, Router, RouterStateSnapshot } from '@angular/router';
import { Component, OnDestroy, OnInit, AfterViewInit, ViewChild, Inject, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { NbContextMenuDirective, NbMediaBreakpointsService, NbMenuService, NbSidebarService, NbThemeService, NB_WINDOW } from '@nebular/theme';

import { filter, map, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { UserData } from 'src/app/@core/data/users';
import { LayoutService } from 'src/app/@core/utils';
import { AuthService } from 'src/app/auth/services/Auth.service';
import { UserService } from 'src/app/@core/project-services/user.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'ngx-header',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit, OnDestroy, AfterViewInit {
alertf(item) {
  var mailToLink = "mailto:info@serdarsevimli.com";
  window.location.href = mailToLink;
}
  //@ViewChild(NbContextMenuDirective) contextMenu: NbContextMenuDirective;

  private destroy$: Subject<void> = new Subject<void>();
  userPictureOnly: boolean = false;
  user: any; 
  isLoggedIn: boolean
  themes = [
    {
      value: 'default',
      name: 'Light',
    },
    {
      value: 'dark',
      name: 'Dark',
    },
    {
      value: 'cosmic',
      name: 'Cosmic',
    },
    {
      value: 'corporate',
      name: 'Corporate',
    },
  ];

  currentTheme = 'default';

  userMenu = [{ title: 'Çıkış' }];
  isDesktop:any
  
  constructor(private sidebarService: NbSidebarService,
    private menuService: NbMenuService,
    private themeService: NbThemeService,
    private userService: UserData,
    private layoutService: LayoutService,
    private breakpointService: NbMediaBreakpointsService,
    private auth: AuthService, private users: UserService,
    private nbMenuService: NbMenuService,
    @Inject(NB_WINDOW) private window,
    private route: Router, private cd: ChangeDetectorRef) {
  }
  navigate(where: string) {
    let url = where === 'login' ? environment.loginUrl : environment.registerUrl
    window.location = <any>(url + "?returnUrl=" + this.route.routerState.snapshot.url)
  }
  ngAfterViewInit(): void {
    const regex_mobile = new RegExp(/Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile/, 'i');
    this.isDesktop = !regex_mobile.test(window.navigator.userAgent); 

    if (this.auth.loggedIn()) {
      this.users.getUserById(this.auth.getCurrentUserId()).subscribe(data => {
        this.user = data
         console.log(data);
         console.log(this.auth.getCurrentUserId());
        
        this.cd.detectChanges()
      })
    }
    this.nbMenuService.onItemClick()
      .pipe(
        filter(({ tag }) => tag === 'my-context-menu'),
        map(({ item: { title } }) => title),
      )
      .subscribe(title => {
        //this.window.alert(`${title} was clicked!`)
        //console.log(title);

        switch (title) {
          case 'Çıkış':
            this.auth.signOut()
            break;          
          default:
            break;
        }       
      });

      this.nbMenuService.onItemClick()
      .pipe(
        filter(({ tag }) => tag !== 'my-context-menu'),
        map(({ item: { title } }) => title),
      )
      .subscribe(title => {
        //this.window.alert(`${title} was clicked!`)
        //console.log(title);  
        if (!this.isDesktop) {
          this.toggleSidebar();
        }             
      });
  }

  ngOnInit() {
    this.currentTheme = this.themeService.currentTheme;

    // this.userService.getUsers()
    //   .pipe(takeUntil(this.destroy$))
    //   .subscribe((users: any) => this.user = users.nick);
    this.isLoggedIn = this.auth.loggedIn()


    const { xl } = this.breakpointService.getBreakpointsMap();
    this.themeService.onMediaQueryChange()
      .pipe(
        map(([, currentBreakpoint]) => currentBreakpoint.width < xl),
        takeUntil(this.destroy$),
      )
      .subscribe((isLessThanXl: boolean) => this.userPictureOnly = isLessThanXl);

    this.themeService.onThemeChange()
      .pipe(
        map(({ name }) => name),
        takeUntil(this.destroy$),
      )
      .subscribe(themeName => this.currentTheme = themeName);
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  changeTheme(themeName: string) {
    console.log(themeName);

    this.themeService.changeTheme(themeName);
  }

  toggleSidebar(): boolean {
    this.sidebarService.toggle(true, 'menu-sidebar');
    this.layoutService.changeLayoutSize();

    return false;
  }

  navigateHome() {
    this.menuService.navigateHome();
    return false;
  }
}
