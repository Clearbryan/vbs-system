import { HttpHeaders, HttpClient } from '@angular/common/http';
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
export class BillingService {

  constructor(private http: HttpClient) { }

  // get orders
  getInvoices() {
    return this.http.get('http://102.130.122.124/api/invoice/', httpOptions);
  }

  // get all statements
  getAllStatements() {
    return this.http.get('http://102.130.122.124/api/statement/', httpOptions);
  }

  // get billing information
  getAllBillingInfo() {
    return this.http.get(`http://102.130.122.124/api/billing/`, httpOptions)
  }

  // update billing information
  updateBillingInfo(data) {
    return this.http.post(`http://102.130.122.124/api/billing/`, data, httpOptions)

  }
}
