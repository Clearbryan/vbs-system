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
        'Content-Type': 'application/json',
      }).set('Authorization', `Token ${localStorage.getItem('token')}`)
    };
  }

  constructor(private http: HttpClient, private hostUrlService: HostUrlService) { }

  // get orders
  getInvoices() {
    return this.http.get(this.hostUrlService.host + '/api/invoice/', this.getHttpOptions());
  }

  // get all statements
  getAllStatements() {
    return this.http.get(this.hostUrlService.host + '/api/statement/', this.getHttpOptions());
  }

  // get billing information
  getAllBillingInfo() {
    return this.http.get(this.hostUrlService.host + `/api/billing/`, this.getHttpOptions())
  }

  // update billing information
  updateBillingInfo(data) {
    return this.http.post(this.hostUrlService.host + `/api/billing/`, data, this.getHttpOptions())

  }
}
