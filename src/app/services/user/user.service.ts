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
<<<<<<< HEAD
    return this.http.post('http://102.67.140.141/api/login/', JSON.stringify(body), options)
=======
    return this.http.post(this.hostUrlService.host + `/api/login/`, JSON.stringify(body), options)
>>>>>>> 9c62390cad3ebd75da29560ceffdc9af77cb62b0
  }

  // user logout
  logoutUser() {
<<<<<<< HEAD
    return this.http.post('http://102.67.140.141/api/logout/', {}, this.getHttpOptions())
=======
    return this.http.post(this.hostUrlService.host + `/api/logout/`, {}, this.getHttpOptions())
>>>>>>> 9c62390cad3ebd75da29560ceffdc9af77cb62b0
  }

  // get user details
  getUserBalance() {
<<<<<<< HEAD
    return this.http.get('http://102.67.140.141/api/balance/', this.getHttpOptions())
=======
    return this.http.get(this.hostUrlService.host + `/api/balance/`, this.getHttpOptions())
>>>>>>> 9c62390cad3ebd75da29560ceffdc9af77cb62b0
  }

  // get company info
  getCompanyInfo() {
<<<<<<< HEAD
    return this.http.get('http://102.67.140.141/api/billing/', this.getHttpOptions())
=======
    return this.http.get(this.hostUrlService.host + `/api/billing/`, this.getHttpOptions())
>>>>>>> 9c62390cad3ebd75da29560ceffdc9af77cb62b0
  }
}
