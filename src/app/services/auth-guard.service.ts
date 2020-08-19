import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {

  constructor(public authService: AuthService, private router: Router) {

  }

  canActivate(): boolean {
    const isAuthenticated = this.authService.isAuthenticated()
    console.log(isAuthenticated)
    if (!isAuthenticated) {
      this.router.navigate(['/'])
      return false
    } else {
      return true
    }
  }
}
