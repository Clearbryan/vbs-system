import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {HostUrlService} from '../host-url.service';

@Injectable({
  providedIn: 'root'
})
export class CampaignService {

  // refreshed token
  getHttpOptions() {
    return {
      headers: new HttpHeaders({
        // 'Content-Type': 'application/json',
      }).set('Authorization', `Token ${localStorage.getItem('token')}`)
    };
  }

  constructor(private http: HttpClient, private hostUrlService: HostUrlService) { }

  // upload audio file
  uploadAudio(name, desc, file) {
    let formData = new FormData()
    formData.append('audio_file', file)
    formData.append('name', name)

    return this.http.post('http://102.67.140.141/api/user/api/audio/', formData, this.getHttpOptions());
  }

  // get all audio
  getAllCampaigns() {
    return this.http.get('http://102.67.140.141/api/user/api/campaign/', this.getHttpOptions())
  }

  // save campaign
  saveCampaign(name, phonebook, desc, start_date, frequency, callerid, timeout, interval, retry, target, dnc, survey, retry_on) {
    let formData = new FormData()
    formData.append('callerid', callerid)
    formData.append('phonebook', phonebook)
    formData.append('calltimeout', timeout)
    formData.append('frequency', frequency)
    formData.append('intervalretries', interval)
    formData.append('maxretries', retry)
    formData.append('created_date', start_date)
    formData.append('name', name)
    formData.append('description', desc)
    formData.append('target', target)
    formData.append('survey', survey)
    formData.append('retry_on', retry_on)
    formData.append('dnc', dnc)


    return this.http.post('http://102.67.140.141/api/user/api/campaign/', formData, this.getHttpOptions());
  }

  startCampaign(id, status, name, phonebook) {
    let formData = new FormData()
    formData.append('status', status)
    formData.append('name', name)
    formData.append('phonebook', phonebook)

    return this.http.put(`http://102.67.140.141/api/user/api/campaign/${id}/`, formData, this.getHttpOptions());
  }

  pauseCampaign(id, status, name, phonebook) {
    let formData = new FormData()
    formData.append('status', status)
    formData.append('name', name)
    formData.append('phonebook', phonebook)

    return this.http.put(`http://102.67.140.141/api/user/api/campaign/${id}/`, formData, this.getHttpOptions());
  }

  stopCampaign(id, status, name, phonebook) {
    let formData = new FormData()
    formData.append('status', status)
    formData.append('name', name)
    formData.append('phonebook', phonebook)

    return this.http.put(`http://102.67.140.141/api/user/api/campaign/${id}/`, formData, this.getHttpOptions());
  }
  
 
  
}
