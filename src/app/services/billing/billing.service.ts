import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


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

  constructor(private http: HttpClient) { }

  // get orders
  getInvoices() {
    return this.http.get('http://102.67.140.141/api/invoice/', this.getHttpOptions());
  }

  // get all statements
  getAllStatements() {
    return this.http.get('http://102.67.140.141/api/statement/', this.getHttpOptions());
  }

  // get billing information
  getAllBillingInfo() {
    return this.http.get(`http://102.67.140.141/api/billing/`, this.getHttpOptions())
  }

  // update billing information
  updateBillingInfo(data) {
    return this.http.post(`http://102.67.140.141/api/billing/`, data, this.getHttpOptions())

  }
}
