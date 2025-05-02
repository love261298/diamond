import { AuthService } from 'src/app/demo/service/auth.service';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { AppSidebarComponent } from './app.sidebar.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-topbar',
  templateUrl: './app.topbar.component.html',
})
export class AppTopbarComponent {
  @ViewChild('menubutton') menuButton!: ElementRef;

  @ViewChild(AppSidebarComponent) appSidebar!: AppSidebarComponent;

  constructor(public layoutService: LayoutService, public el: ElementRef, private authService: AuthService, private router: Router) { }

  onMenuButtonClick() {
    this.layoutService.onMenuToggle();
  }

  onProfileButtonClick() {
    this.layoutService.showRightMenu();
  }

  onSearchClick() {
    this.layoutService.toggleSearchBar();
  }

  onRightMenuClick() {
    this.layoutService.showRightMenu();
  }
  logout() {
    this.authService.logout();
  }
  get logo() {
    const logo =
      this.layoutService.config().menuTheme === 'white' ||
        this.layoutService.config().menuTheme === 'orange'
        ? 'dark'
        : 'white';
    return logo;
  }
}
