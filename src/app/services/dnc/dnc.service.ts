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
export class DncService {

  constructor(private http: HttpClient) { }
  // add new dnc
  addDnc(name, description) {
    const body = {
      name: name,
      description: description
    }
    return this.http.post('http://102.130.121.230/api/dnc/', JSON.stringify(body), httpOptions);
  }

  // get all DNC 
  getAllDnc() {
    return this.http.get('http://102.130.121.230/api/dnc/', httpOptions)
  }

  // get dnc leads
  getDncContacts(id) {
    return this.http.get(`http://102.130.121.230/api/dnc/${id}/`, httpOptions)
  }
}
