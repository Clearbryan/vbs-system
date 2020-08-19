import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  // user login
  userLogin(username, password) {
    return this.http.post('http://102.130.122.124/api/login/', {
      headers: {
        'Content-type': 'application/json'
      },

      username: username,
      password: password

    })
  }

  // user logout
  logoutUser() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Token ${localStorage.getItem('token')}`,
      })
    };
    return this.http.post('http://102.130.122.124/api/logout/', {}, httpOptions)
  }

  // get user details
  getUserBalance() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Token ${localStorage.getItem('token')}`,
      })
    };
    return this.http.get('http://102.130.122.124/api/balance/', httpOptions)
  }
}
