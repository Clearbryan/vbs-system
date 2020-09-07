import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {HostUrlService} from '../host-url.service';


@Injectable({
  providedIn: 'root'
})
export class CdrService {

  // refreshed token
  getHttpOptions() {
    return {
      headers: new HttpHeaders({
        // 'Content-Type': 'application/json',
      }).set('Authorization', `Token ${localStorage.getItem('token')}`)
    };
  }

  constructor(private http: HttpClient, private hostUrlService: HostUrlService) { }

  // get single cdr
  getCdr() {
<<<<<<< HEAD
    return this.http.get('http://102.67.140.141/api/cdr/', this.getHttpOptions())
=======
    return this.http.get(this.hostUrlService.host + '/api/cdr/', this.getHttpOptions())
>>>>>>> 9c62390cad3ebd75da29560ceffdc9af77cb62b0
  }
}
