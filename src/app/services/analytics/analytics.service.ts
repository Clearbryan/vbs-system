import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';


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

  constructor(private http: HttpClient) { }

  // get all audio
  getAllReports() {
    return this.http.get('http://102.130.123.3/api/analytics/', this.getHttpOptions())
  }

  // get single report 
  getSingleReport(id) {
    return this.http.get(`http://102.130.123.3/api/analytics/${id}/`, this.getHttpOptions())
  }
}
