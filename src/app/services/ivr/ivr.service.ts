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
export class IvrService {

  constructor(private http: HttpClient) { }

  addContact(name, desc, file) {
    let formData = new FormData()
    formData.append('file', file)
    formData.append('name', name)
    formData.append('desc', desc)

    return this.http.post('http://102.130.122.124/api/survey/', formData, httpOptions);
  }

  // get all contacts
  getAllIvrMenus() {
    return this.http.get('http://102.130.122.124/api/survey/', httpOptions)
  }

  // get single ivr
  getIvrMenu(id) {
    return this.http.get(`http://102.130.122.124/api/survey/${id}`, httpOptions)
  }

  // edit ivr menu
  editIvr(id, name, audio, description, data) {
    let formData = new FormData()
    formData.append('name', name)
    formData.append('audio', audio)
    formData.append('description', description)
    formData.append('data', data)

    return this.http.put(`http://102.130.122.124/api/survey/${id}/`, formData, httpOptions)
  }

  // add ivr menu
  submitIvrMenu(name, desc, audio, data) {
    let formData = new FormData()
    formData.append('name', name)
    formData.append('audio', audio)
    formData.append('description', desc)
    formData.append('data', data)

    return this.http.post('http://102.130.122.124/api/survey/', formData, httpOptions);

  }
}
