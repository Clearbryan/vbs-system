import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {HostUrlService} from '../host-url.service';


@Injectable({
  providedIn: 'root'
})
export class AnalyticsService {

  // refreshed token
  getHttpOptions() {
    return {
      headers: new HttpHeaders({
        // 'Content-Type': 'application/json',
      }).set('Authorization', `Token ${localStorage.getItem('token')}`)
    };
  }

  constructor(private http: HttpClient, private hostUrlService: HostUrlService) { }

  // get all audio
  getAllReports() {
<<<<<<< HEAD
    return this.http.get('http://102.67.140.141/api/analytics/', this.getHttpOptions())
=======
    return this.http.get(this.hostUrlService.host + '/api/analytics/', this.getHttpOptions())
>>>>>>> 9c62390cad3ebd75da29560ceffdc9af77cb62b0
  }

  // get single report 
  getSingleReport(id) {
<<<<<<< HEAD
    return this.http.get(`http://102.67.140.141/api/analytics/${id}/`, this.getHttpOptions())
=======
    return this.http.get(this.hostUrlService.host + `/api/analytics/${id}/`, this.getHttpOptions())
>>>>>>> 9c62390cad3ebd75da29560ceffdc9af77cb62b0
  }
}
