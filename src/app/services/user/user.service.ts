import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {HostUrlService} from '../host-url.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient, private hostUrlService: HostUrlService) { }

  // refreshed token
  getHttpOptions() {
    return {
      headers: new HttpHeaders({
        // 'Content-Type': 'application/json',
      }).set('Authorization', `Token ${localStorage.getItem('token')}`)
    };
  }

  // user login
  userLogin(username, password) {
    const options = {
      headers: new HttpHeaders({
        'Content-type': 'application/json'
      })
    }
    const body = {
      username: username,
      password: password
    }
    return this.http.post('http://102.67.140.141/api/login/', JSON.stringify(body), options)
  }

  // user logout
  logoutUser() {
    return this.http.post('http://102.67.140.141/api/logout/', {}, this.getHttpOptions())
  }

  // get user details
  getUserBalance() {
    return this.http.get('http://102.67.140.141/api/balance/', this.getHttpOptions())
  }

  // get company info
  getCompanyInfo() {
    return this.http.get('http://102.67.140.141/api/billing/', this.getHttpOptions())
  }
}
