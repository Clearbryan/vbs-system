import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {HostUrlService} from '../host-url.service';


@Injectable({
  providedIn: 'root'
})
export class BillingService {

  // refreshed token
  getHttpOptions() {
    return {
      headers: new HttpHeaders({
        // 'Content-Type': 'application/json',
      }).set('Authorization', `Token ${localStorage.getItem('token')}`)
    };
  }

  constructor(private http: HttpClient, private hostUrlService: HostUrlService) { }

  // get orders
  getInvoices() {
<<<<<<< HEAD
    return this.http.get('http://102.67.140.141/api/invoice/', this.getHttpOptions());
=======
    return this.http.get(this.hostUrlService.host + '/api/invoice/', this.getHttpOptions());
>>>>>>> 9c62390cad3ebd75da29560ceffdc9af77cb62b0
  }

  // get all statements
  getAllStatements() {
<<<<<<< HEAD
    return this.http.get('http://102.67.140.141/api/statement/', this.getHttpOptions());
=======
    return this.http.get(this.hostUrlService.host + '/api/statement/', this.getHttpOptions());
>>>>>>> 9c62390cad3ebd75da29560ceffdc9af77cb62b0
  }

  // get billing information
  getAllBillingInfo() {
<<<<<<< HEAD
    return this.http.get(`http://102.67.140.141/api/billing/`, this.getHttpOptions())
=======
    return this.http.get(this.hostUrlService.host + `/api/billing/`, this.getHttpOptions())
>>>>>>> 9c62390cad3ebd75da29560ceffdc9af77cb62b0
  }

  // update billing information
  updateBillingInfo(data) {
<<<<<<< HEAD
    return this.http.post(`http://102.67.140.141/api/billing/`, data, this.getHttpOptions())
=======
    return this.http.post(this.hostUrlService.host + `/api/billing/`, data, this.getHttpOptions())
>>>>>>> 9c62390cad3ebd75da29560ceffdc9af77cb62b0

  }
}
