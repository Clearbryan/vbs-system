import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {HostUrlService} from '../host-url.service';


@Injectable({
  providedIn: 'root'
})
export class AudioService {

  // refreshed token
  getHttpOptions() {
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }).set('Authorization', `Token ${localStorage.getItem('token')}`)
    };
  }

  constructor(private http: HttpClient, private hostUrlService: HostUrlService) { }

  // upload audio file
  uploadAudio(name, desc, file) {
    let formData = new FormData()
    formData.append('audio_file', file)
    formData.append('name', name)
    formData.append('description', desc)

    return this.http.post(this.hostUrlService.host + '/api/audio/', formData, this.getHttpOptions());
  }

  // get all audio
  getAllAudiofiles() {
    return this.http.get(this.hostUrlService.host + '/api/audio/', this.getHttpOptions())
  }

  // get single audio file
  getSingleAudio(id) {
    return this.http.get(this.hostUrlService.host + `/api/audio/${id}/`, this.getHttpOptions())

  }

  // delete audio file
  deleteAudio(id) {
    return this.http.delete(this.hostUrlService.host + `/api/audio/${id}/`, this.getHttpOptions())
  }

  // edit audio
  editAudio(id, name, file, desc) {
    let formData = new FormData()
    formData.append('audio_file', file)
    formData.append('name', name)
    formData.append('description', desc)
    return this.http.put(this.hostUrlService.host + `/api/audio/${id}/`, formData, this.getHttpOptions())
  }

}
