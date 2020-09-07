import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {HostUrlService} from '../host-url.service';


@Injectable({
  providedIn: 'root'
})
export class PhonebookService {

  // refreshed token
  getHttpOptions() {
    return {
      headers: new HttpHeaders({
<<<<<<< HEAD
        // 'Content-Type': 'application/json',
=======
        'Content-Type': 'multipart/form-data',
>>>>>>> 9c62390cad3ebd75da29560ceffdc9af77cb62b0
      }).set('Authorization', `Token ${localStorage.getItem('token')}`)
    };
  }

  saveCampaign(name: any, phonebook: any, description: String, start_date: any, frequency: any, callerid: any, calltimeout: Number, intervalretries: Number, maxretry: Number, target: Number, dnc: any, survey: any, retry_on: any) {
    throw new Error('Method not implemented.');
  }
  constructor(private http: HttpClient, private hostUrlService: HostUrlService) { }

  // upload contacts
  addContact(name, desc, file) {
    let formData = new FormData()
    formData.append('file', file)
    formData.append('name', name)
    formData.append('desc', desc)

<<<<<<< HEAD
    return this.http.post('http://102.67.140.141/api/phonebook/', formData, this.getHttpOptions());
=======
    return this.http.post(this.hostUrlService.host + `/api/phonebook/`, formData, this.getHttpOptions());
>>>>>>> 9c62390cad3ebd75da29560ceffdc9af77cb62b0
  }

  // get all contacts
  getAllContacts() {
<<<<<<< HEAD
    return this.http.get('http://102.67.140.141/api/phonebook/', this.getHttpOptions())
  }

  // get phonebook by name
  getPhonebookByName(name) {
    return this.http.get(`http://102.67.140.141/api/phonebook/${name}/`, this.getHttpOptions())
=======
    return this.http.get(this.hostUrlService.host + `/api/phonebook/`, this.getHttpOptions())
>>>>>>> 9c62390cad3ebd75da29560ceffdc9af77cb62b0
  }

  // get leads in a specified phonebook
  getLeads(id) {
<<<<<<< HEAD
    return this.http.get(`http://102.67.140.141/api/phonebook/${id}/leads`, this.getHttpOptions())
=======
    return this.http.get(this.hostUrlService.host + `/api/phonebook/${id}/leads`, this.getHttpOptions())
>>>>>>> 9c62390cad3ebd75da29560ceffdc9af77cb62b0
  }

  // get single phonebook
  getPhonebook(id) {
<<<<<<< HEAD
    return this.http.get(`http://102.67.140.141/api/phonebook/${id}`, this.getHttpOptions())
=======
    return this.http.get(this.hostUrlService.host + `/api/phonebook/${id}`, this.getHttpOptions())
>>>>>>> 9c62390cad3ebd75da29560ceffdc9af77cb62b0
  }

  // update phonebook
  updatePhonebook(id, name, file, desc) {
    let formData = new FormData()
    formData.append('file', file)
    formData.append('name', name)
    formData.append('description', desc)
<<<<<<< HEAD
    return this.http.put(`http://102.67.140.141/api/phonebook/${id}/`, formData, this.getHttpOptions())
=======
    return this.http.put(this.hostUrlService.host + `/api/phonebook/${id}/`, formData, this.getHttpOptions())
>>>>>>> 9c62390cad3ebd75da29560ceffdc9af77cb62b0
  }

  // delete phonebook
  deletePhoneBook(id) {
<<<<<<< HEAD
    return this.http.delete(`http://102.67.140.141/api/phonebook/${id}/`, this.getHttpOptions())
=======
    return this.http.delete(this.hostUrlService.host + `/api/phonebook/${id}/`, this.getHttpOptions())
>>>>>>> 9c62390cad3ebd75da29560ceffdc9af77cb62b0
  }

  // get progress 
  progress(id) {
<<<<<<< HEAD
    return this.http.get(`http://102.67.140.141/api/phonebook/${id}/progress/`, this.getHttpOptions())
=======
    return this.http.get(this.hostUrlService.host + `/api/phonebook/${id}/progress/`, this.getHttpOptions())
>>>>>>> 9c62390cad3ebd75da29560ceffdc9af77cb62b0
  }

  // add lead
  addLead(id, lead) {
    let formData = new FormData()
    formData.append('contact', lead)
<<<<<<< HEAD
    return this.http.post(`http://102.67.140.141/api/phonebook/${id}/append/`, formData, this.getHttpOptions())
=======
    return this.http.post(this.hostUrlService.host + `/api/phonebook/${id}/append/`, formData, this.getHttpOptions())
>>>>>>> 9c62390cad3ebd75da29560ceffdc9af77cb62b0
  }
  
}
