import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';


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

  constructor(private http: HttpClient) { }

  addContact(name, desc, file) {
    let formData = new FormData()
    formData.append('file', file)
    formData.append('name', name)
    formData.append('desc', desc)

    return this.http.post('http://102.67.140.141/api/survey/', formData, this.getHttpOptions());
  }

  // get all contacts
  getAllIvrMenus() {
    return this.http.get('http://102.67.140.141/api/survey/', this.getHttpOptions())
  }

  // get single ivr
  getIvrMenu(id) {
    return this.http.get(`http://102.67.140.141/api/survey/${id}`, this.getHttpOptions())
  }

  // edit ivr menu
  editIvr(id, name, audio, description, data) {
    let formData = new FormData()
    formData.append('name', name)
    formData.append('audio', audio)
    formData.append('description', description)
    formData.append('data', data)

    return this.http.put(`http://102.67.140.141/api/survey/${id}/`, formData, this.getHttpOptions())
  }

  // add ivr menu
  submitIvrMenu(name, desc, audio, data) {
    let formData = new FormData()
    formData.append('name', name)
    formData.append('audio', audio)
    formData.append('description', desc)
    formData.append('data', data)

    return this.http.post('http://102.67.140.141/api/survey/', formData, this.getHttpOptions());

  }

  deleteIvr(id) {
    return this.http.delete(`http://102.67.140.141/api/survey/${id}/`, this.getHttpOptions())
  }
}
