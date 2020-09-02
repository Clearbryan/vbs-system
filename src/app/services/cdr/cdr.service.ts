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
export class CdrService {

  constructor(private http: HttpClient) { }

  // get single cdr
  getCdr() {
    return this.http.get('http://102.130.123.3/api/cdr/', httpOptions)
  }
}
