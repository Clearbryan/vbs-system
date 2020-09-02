import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }).set('Authorization', `Token ${localStorage.getItem('token')}`)
};

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

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
    return this.http.post('http://102.130.123.3/api/login/', JSON.stringify(body), options)
  }

  // user logout
  logoutUser() {
    return this.http.post('http://102.130.123.3/api/logout/', {}, httpOptions)
  }

  // get user details
  getUserBalance() {
    return this.http.get('http://102.130.123.3/api/balance/', httpOptions)
  }

  // get company info
  getCompanyInfo() {
    return this.http.get('http://102.130.123.3/api/billing/', httpOptions)
  }
}
