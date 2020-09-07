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
        'Content-Type': 'application/json',
      }).set('Authorization', `Token ${localStorage.getItem('token')}`)
    };
  }

  constructor(private http: HttpClient, private hostUrlService: HostUrlService) { }

  // get all audio
  getAllReports() {
    return this.http.get(this.hostUrlService.host + '/api/analytics/', this.getHttpOptions())
  }

  // get single report 
  getSingleReport(id) {
    return this.http.get(this.hostUrlService.host + `/api/analytics/${id}/`, this.getHttpOptions())
  }
}
