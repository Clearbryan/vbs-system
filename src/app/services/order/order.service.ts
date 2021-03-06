import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {HostUrlService} from '../host-url.service';


@Injectable({
  providedIn: 'root'
})
export class OrderService {

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
  getProducts() {
    return this.http.get('http://102.67.140.141/api/package/', this.getHttpOptions());
  }

  // create order
  order(amount, credits, packageId) {
    let body = {
      amount: amount,
      package: packageId,
      quantity: credits
    }
    return this.http.post('http://102.67.140.141/api/order/', body, this.getHttpOptions())
  }

  // // get checkout id
  // checkout(id) {
  //   return this.http.post(`http://102.67.140.141/api/order/${id}/checkout/`, {
  //     headers: {
  //     'Authorization': 'Token e0f2350e5051b8707959895e14eae7e7f67640b2ed13bdc1bd54cc0535bc687e'
  //   }})
  // }

  // get single order
  getOrder(id) {
    return this.http.get(`http://102.67.140.141/api/order/${id}/`, this.getHttpOptions())
  }

  checkout(id) {
    return this.http.post(`http://102.67.140.141/api/order/${id}/checkout/`, {}, this.getHttpOptions())
  }

  // payment 
  makePayment(id) {
    return this.http.get(`http://102.67.140.141/api/order/${id}/payment/`, this.getHttpOptions())
  }
}
