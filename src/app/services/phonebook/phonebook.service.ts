import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class PhonebookService {

  // refreshed token
  getHttpOptions() {
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }).set('Authorization', `Token ${localStorage.getItem('token')}`)
    };
  }

  saveCampaign(name: any, phonebook: any, description: String, start_date: any, frequency: any, callerid: any, calltimeout: Number, intervalretries: Number, maxretry: Number, target: Number, dnc: any, survey: any, retry_on: any) {
    throw new Error('Method not implemented.');
  }
  constructor(private http: HttpClient) { }

  // upload contacts
  addContact(name, desc, file) {
    let formData = new FormData()
    formData.append('file', file)
    formData.append('name', name)
    formData.append('desc', desc)

    return this.http.post('http://102.130.123.3/api/phonebook/', formData, this.getHttpOptions());
  }

  // get all contacts
  getAllContacts() {
    return this.http.get('http://102.130.123.3/api/phonebook/', this.getHttpOptions())
  }

  // get leads in a specified phonebook
  getLeads(id) {
    return this.http.get(`http://102.130.123.3/api/phonebook/${id}/leads`, this.getHttpOptions())
  }

  // get single phonebook
  getPhonebook(id) {
    return this.http.get(`http://102.130.123.3/api/phonebook/${id}`, this.getHttpOptions())
  }

  // update phonebook
  updatePhonebook(id, name, file, desc) {
    let formData = new FormData()
    formData.append('file', file)
    formData.append('name', name)
    formData.append('description', desc)
    return this.http.put(`http://102.130.123.3/api/phonebook/${id}/`, formData, this.getHttpOptions())
  }

  // delete phonebook
  deletePhoneBook(id) {
    return this.http.delete(`http://102.130.123.3/api/phonebook/${id}/`, this.getHttpOptions())
  }

  // get progress 
  progress(id) {
    return this.http.get(`http://102.130.123.3/api/phonebook/${id}/progress/`, this.getHttpOptions())
  }

  // add lead
  addLead(id, lead) {
    let formData = new FormData()
    formData.append('contact', lead)
    return this.http.post(`http://102.130.123.3/api/phonebook/${id}/append/`, formData, this.getHttpOptions())
  }
  
}
