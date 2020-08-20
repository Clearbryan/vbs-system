import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
const httpOptions = {
  headers: new HttpHeaders({
    //'Content-Type': 'application/json',
    'Authorization': `Token ${localStorage.getItem('token')}`
  })
};

@Injectable({
  providedIn: 'root'
})
export class AnalyticsService {

  constructor(private http: HttpClient) { }

  // get all audio
  getAllReports() {
    return this.http.get('http://102.130.121.230/api/analytics/', httpOptions)
  }

  // get single report 
  getSingleReport(id) {
    return this.http.get(`http://102.130.121.230/api/analytics/${id}/`, httpOptions)
  }
}
