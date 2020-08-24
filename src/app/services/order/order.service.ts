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
export class OrderService {

  constructor(private http: HttpClient) { }


  // add new dnc
  purchaseCredits(price) {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer OGE4Mjk0MTc0ZTczNWQwYzAxNGU3OGNmMjY2YjE3OTR8cXl5ZkhDTjgzZQ==',
        'Access-Control-Allow-Origin': '*'
      })
     
    }
    const body = {
      port: 443,
      entityId:'8a8294174e735d0c014e78cf26461790',
      amount: `${price}`,
      currency:'ZAR',
      paymentType: 'DB' 
    }
    return this.http.post('https://test.oppwa.com/v1/checkouts/', body, options);
  }

  // get orders
  getProducts() {
    return this.http.get('http://102.130.121.230/api/package/', httpOptions);
  }
}
