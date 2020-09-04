import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class DncService {

  // refreshed token
  getHttpOptions() {
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }).set('Authorization', `Token ${localStorage.getItem('token')}`)
    };
  }

  constructor(private http: HttpClient) { }
  // add new dnc
  addDnc(name, description) {
    const body = {
      name: name,
      description: description
    }
    return this.http.post('http://102.130.123.3/api/dnc/', JSON.stringify(body), this.getHttpOptions());
  }

  // add dnc lead
  addDncLead(id, lead) {
    const body = {
      phone_number: lead
    }
    return this.http.post(`http://102.130.123.3/api/dnc/${id}/append/`, JSON.stringify(body), this.getHttpOptions());
  }

  // get dnc leads
  getDnc(id) {
    return this.http.get(`http://102.130.123.3/api/dnc/${id}/`, this.getHttpOptions());
  }

  // get all DNC 
  getAllDnc() {
    return this.http.get('http://102.130.123.3/api/dnc/', this.getHttpOptions())
  }

  // get dnc leads
  getDncContacts(id) {
    return this.http.get(`http://102.130.123.3/api/dnc/${id}/leads/`, this.getHttpOptions())
  }
}
