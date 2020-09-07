import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {HostUrlService} from '../host-url.service';


@Injectable({
  providedIn: 'root'
})
export class IvrService {

  // refreshed token
  getHttpOptions() {
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }).set('Authorization', `Token ${localStorage.getItem('token')}`)
    };
  }

  constructor(private http: HttpClient, private hostUrlService: HostUrlService) { }

  addContact(name, desc, file) {
    let formData = new FormData()
    formData.append('file', file)
    formData.append('name', name)
    formData.append('desc', desc)

<<<<<<< HEAD
    return this.http.post('http://102.67.140.141/api/survey/', formData, this.getHttpOptions());
=======
    return this.http.post(this.hostUrlService.host + '/api/survey/', formData, this.getHttpOptions());
>>>>>>> 9c62390cad3ebd75da29560ceffdc9af77cb62b0
  }

  // get all contacts
  getAllIvrMenus() {
<<<<<<< HEAD
    return this.http.get('http://102.67.140.141/api/survey/', this.getHttpOptions())
=======
    return this.http.get(this.hostUrlService.host + '/api/survey/', this.getHttpOptions())
>>>>>>> 9c62390cad3ebd75da29560ceffdc9af77cb62b0
  }

  // get single ivr
  getIvrMenu(id) {
<<<<<<< HEAD
    return this.http.get(`http://102.67.140.141/api/survey/${id}`, this.getHttpOptions())
=======
    return this.http.get(this.hostUrlService.host + `/api/survey/${id}`, this.getHttpOptions())
>>>>>>> 9c62390cad3ebd75da29560ceffdc9af77cb62b0
  }

  // edit ivr menu
  editIvr(id, name, audio, description, data) {
    let formData = new FormData()
    formData.append('name', name)
    formData.append('audio', audio)
    formData.append('description', description)
    formData.append('data', data)

<<<<<<< HEAD
    return this.http.put(`http://102.67.140.141/api/survey/${id}/`, formData, this.getHttpOptions())
=======
    return this.http.put(this.hostUrlService.host + `/api/survey/${id}/`, formData, this.getHttpOptions())
>>>>>>> 9c62390cad3ebd75da29560ceffdc9af77cb62b0
  }

  // add ivr menu
  submitIvrMenu(name, desc, audio, data) {
    let formData = new FormData()
    formData.append('name', name)
    formData.append('audio', audio)
    formData.append('description', desc)
    formData.append('data', data)

<<<<<<< HEAD
    return this.http.post('http://102.67.140.141/api/survey/', formData, this.getHttpOptions());
=======
    return this.http.post(this.hostUrlService.host + '/api/survey/', formData, this.getHttpOptions());
>>>>>>> 9c62390cad3ebd75da29560ceffdc9af77cb62b0

  }

  deleteIvr(id) {
    return this.http.delete(`http://102.67.140.141/api/survey/${id}/`, this.getHttpOptions())
  }
}
