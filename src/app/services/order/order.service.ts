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
<<<<<<< HEAD
    return this.http.get('http://102.67.140.141/api/package/', this.getHttpOptions());
=======
    return this.http.get(this.hostUrlService.host + '/api/package/', this.getHttpOptions());
>>>>>>> 9c62390cad3ebd75da29560ceffdc9af77cb62b0
  }

  // create order
  order(amount, credits, packageId) {
    let body = {
      amount: amount,
      package: packageId,
      quantity: credits
    }
<<<<<<< HEAD
    return this.http.post('http://102.67.140.141/api/order/', body, this.getHttpOptions())
=======
    return this.http.post(this.hostUrlService.host + '/api/order/', body, this.getHttpOptions())
>>>>>>> 9c62390cad3ebd75da29560ceffdc9af77cb62b0
  }

  // // get checkout id
  // checkout(id) {
<<<<<<< HEAD
  //   return this.http.post(`http://102.67.140.141/api/order/${id}/checkout/`, {
=======
  //   return this.http.post(this.hostUrlService.host + `/api/order/${id}/checkout/`, {
>>>>>>> 9c62390cad3ebd75da29560ceffdc9af77cb62b0
  //     headers: {
  //     'Authorization': 'Token e0f2350e5051b8707959895e14eae7e7f67640b2ed13bdc1bd54cc0535bc687e'
  //   }})
  // }

  // get single order
  getOrder(id) {
<<<<<<< HEAD
    return this.http.get(`http://102.67.140.141/api/order/${id}/`, this.getHttpOptions())
  }

  checkout(id) {
    return this.http.post(`http://102.67.140.141/api/order/${id}/checkout/`, {}, this.getHttpOptions())
=======
    return this.http.get(this.hostUrlService.host + `/api/order/${id}/`, this.getHttpOptions())
  }

  checkout(id) {
    return this.http.post(this.hostUrlService.host + `/api/order/${id}/checkout/`, {}, this.getHttpOptions())
>>>>>>> 9c62390cad3ebd75da29560ceffdc9af77cb62b0
  }

  // payment 
  makePayment(id) {
<<<<<<< HEAD
    return this.http.get(`http://102.67.140.141/api/order/${id}/payment/`, this.getHttpOptions())
=======
    return this.http.get(this.hostUrlService.host + `/api/order/${id}/payment/`, this.getHttpOptions())
>>>>>>> 9c62390cad3ebd75da29560ceffdc9af77cb62b0
  }
}
