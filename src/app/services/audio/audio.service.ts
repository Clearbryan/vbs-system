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
    formData.append('description', desc)

<<<<<<< HEAD
    return this.http.post('http://102.67.140.141/api/audio/', formData, this.getHttpOptions());
=======
    return this.http.post(this.hostUrlService.host + '/api/audio/', formData, this.getHttpOptions());
>>>>>>> 9c62390cad3ebd75da29560ceffdc9af77cb62b0
  }

  // get all audio
  getAllAudiofiles() {
<<<<<<< HEAD
    return this.http.get('http://102.67.140.141/api/audio/', this.getHttpOptions())
=======
    return this.http.get(this.hostUrlService.host + '/api/audio/', this.getHttpOptions())
>>>>>>> 9c62390cad3ebd75da29560ceffdc9af77cb62b0
  }

  // get single audio file
  getSingleAudio(id) {
<<<<<<< HEAD
    return this.http.get(`http://102.67.140.141/api/audio/${id}/`, this.getHttpOptions())
=======
    return this.http.get(this.hostUrlService.host + `/api/audio/${id}/`, this.getHttpOptions())
>>>>>>> 9c62390cad3ebd75da29560ceffdc9af77cb62b0

  }

  // delete audio file
  deleteAudio(id) {
<<<<<<< HEAD
    return this.http.delete(`http://102.67.140.141/api/audio/${id}/`, this.getHttpOptions())
=======
    return this.http.delete(this.hostUrlService.host + `/api/audio/${id}/`, this.getHttpOptions())
>>>>>>> 9c62390cad3ebd75da29560ceffdc9af77cb62b0
  }

  // edit audio
  editAudio(id, name, file, desc) {
    let formData = new FormData()
    formData.append('audio_file', file)
    formData.append('name', name)
    formData.append('description', desc)
<<<<<<< HEAD
    return this.http.put(`http://102.67.140.141/api/audio/${id}/`, formData, this.getHttpOptions())
=======
    return this.http.put(this.hostUrlService.host + `/api/audio/${id}/`, formData, this.getHttpOptions())
>>>>>>> 9c62390cad3ebd75da29560ceffdc9af77cb62b0
  }

}
