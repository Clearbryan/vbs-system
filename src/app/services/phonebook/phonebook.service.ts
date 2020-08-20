import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
const httpOptions = {
  headers: new HttpHeaders({
    'Authorization': `Token ${localStorage.getItem('token')}`
  })
};

@Injectable({
  providedIn: 'root'
})
export class PhonebookService {
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

    return this.http.post('http://102.130.121.230/api/phonebook/', formData, httpOptions);
  }

  // get all contacts
  getAllContacts() {
    return this.http.get('http://102.130.121.230/api/phonebook/', httpOptions)
  }

  // get leads in a specified phonebook
  getLeads(id) {
    return this.http.get(`http://102.130.121.230/api/leads/${id}`, httpOptions)
  }

  // get single phonebook
  getPhonebook(id) {
    return this.http.get(`http://102.130.121.230/api/phonebook/${id}`, httpOptions)
  }

  // update phonebook
  updatePhonebook(id, name, file, desc) {
    let formData = new FormData()
    formData.append('file', file)
    formData.append('name', name)
    formData.append('description', desc)
    return this.http.put(`http://102.130.121.230/api/phonebook/${id}/`, formData, httpOptions)
  }

  // delete phonebook
  deletePhoneBook(id) {
    return this.http.delete(`http://102.130.121.230/api/phonebook/${id}/`, httpOptions)
  }
}
