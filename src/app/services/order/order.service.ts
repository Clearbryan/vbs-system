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
  purchaseCredits(title, price, slug, description) {
    const body = {
      title: title,
      price: price,
      slug: slug,
      description: description

    }
    return this.http.post('http://102.130.122.124/api/stats/', JSON.stringify(body), httpOptions);
  }

  // get orders
  getProducts() {
    return this.http.get('http://102.130.122.124/api/package/', httpOptions);
  }
}
