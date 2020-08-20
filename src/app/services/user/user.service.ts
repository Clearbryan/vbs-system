import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Token ${localStorage.getItem('token')}`,
  })
};

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  // user login
  userLogin(username, password) {
    return this.http.post('http://102.130.121.230/api/login/', {
      headers: {
        'Content-type': 'application/json'
      },
      username: username,
      password: password
    })
  }

  // user logout
  logoutUser() {
    return this.http.post('http://102.130.121.230/api/logout/', {}, httpOptions)
  }

  // get user details
  getUserBalance() {
    return this.http.get('http://102.130.121.230/api/balance/', httpOptions)
  }

  // get company info
  getCompanyInfo() {
    return this.http.get('http://102.130.121.230/api/billing/', httpOptions)
  }
}
