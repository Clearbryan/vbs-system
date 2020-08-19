import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }
  public isAuthenticated(): boolean {
    let token = localStorage.getItem('token')
    if (!token) {
      return false
    } else if (typeof token === null) {
      return false
    }
    else {
      return true
    }

  }
}
