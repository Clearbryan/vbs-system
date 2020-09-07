import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {HostUrlService} from '../host-url.service';


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

  constructor(private http: HttpClient, private hostUrlService: HostUrlService) { }
  // add new dnc
  addDnc(name, description) {
    const body = {
      name: name,
      description: description
    }
<<<<<<< HEAD
    return this.http.post('http://102.67.140.141/api/dnc/', JSON.stringify(body), this.getHttpOptions());
=======
    return this.http.post(this.hostUrlService.host + '/api/dnc/', JSON.stringify(body), this.getHttpOptions());
>>>>>>> 9c62390cad3ebd75da29560ceffdc9af77cb62b0
  }

  // add dnc lead
  addDncLead(id, lead) {
    const body = {
      phone_number: lead
    }
<<<<<<< HEAD
    return this.http.post(`http://102.67.140.141/api/dnc/${id}/append/`, JSON.stringify(body), this.getHttpOptions());
=======
    return this.http.post(this.hostUrlService.host + `/api/dnc/${id}/append/`, JSON.stringify(body), this.getHttpOptions());
>>>>>>> 9c62390cad3ebd75da29560ceffdc9af77cb62b0
  }

  // get dnc leads
  getDnc(id) {
<<<<<<< HEAD
    return this.http.get(`http://102.67.140.141/api/dnc/${id}/`, this.getHttpOptions());
=======
    return this.http.get(this.hostUrlService.host + `/api/dnc/${id}/`, this.getHttpOptions());
>>>>>>> 9c62390cad3ebd75da29560ceffdc9af77cb62b0
  }

  // get all DNC 
  getAllDnc() {
<<<<<<< HEAD
    return this.http.get('http://102.67.140.141/api/dnc/', this.getHttpOptions())
=======
    return this.http.get(this.hostUrlService.host + '/api/dnc/', this.getHttpOptions())
>>>>>>> 9c62390cad3ebd75da29560ceffdc9af77cb62b0
  }

  // get dnc leads
  getDncContacts(id) {
<<<<<<< HEAD
    return this.http.get(`http://102.67.140.141/api/dnc/${id}/leads/`, this.getHttpOptions())
=======
    return this.http.get(this.hostUrlService.host + `/api/dnc/${id}/leads/`, this.getHttpOptions())
>>>>>>> 9c62390cad3ebd75da29560ceffdc9af77cb62b0
  }
}
