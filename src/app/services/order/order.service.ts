import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Token ${localStorage.getItem('token')}`
  })
};

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient) { }

  // get orders
  getProducts() {
    return this.http.get('http://102.130.123.3/api/package/', httpOptions);
  }

  // create order
  order(amount, credits, packageId) {
    let body = {
      amount: amount,
      package: packageId,
      quantity: credits
    }
    return this.http.post('http://102.130.123.3/api/order/', body, httpOptions)
  }

  // // get checkout id
  // checkout(id) {
  //   return this.http.post(`http://102.130.123.3/api/order/${id}/checkout/`, {
  //     headers: {
  //     'Authorization': 'Token e0f2350e5051b8707959895e14eae7e7f67640b2ed13bdc1bd54cc0535bc687e'
  //   }})
  // }

  // get single order
  getOrder(id) {
    return this.http.get(`http://102.130.123.3/api/order/${id}/`, httpOptions)
  }

  checkout(id) {
    return this.http.post(`http://102.130.123.3/api/order/${id}/checkout/`, {}, httpOptions)
  }

  // payment 
  makePayment(id) {
    return this.http.get(`http://102.130.123.3/api/order/${id}/payment/`, httpOptions)
  }
}
