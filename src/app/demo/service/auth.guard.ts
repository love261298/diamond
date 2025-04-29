import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService) { }

  canActivate(): any {
    const isLoggedIn = this.authService.isLoggedIn();
    isLoggedIn ? true : this.authService.logout();
  }
}