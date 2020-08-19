import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

const httpOptions = {
  headers: new HttpHeaders({
    // 'Content-Type': 'application/json',
    'Authorization': `Token ${localStorage.getItem('token')}`
  })
};

@Injectable({
  providedIn: 'root'
})
export class AudioService {

  constructor(private http: HttpClient) { }

  // upload audio file
  uploadAudio(name, desc, file) {
    let formData = new FormData()
    formData.append('audio_file', file)
    formData.append('name', name)
    formData.append('description', desc)

    return this.http.post('http://102.130.122.124/api/audio/', formData, httpOptions);
  }

  // get all audio
  getAllAudiofiles() {
    return this.http.get('http://102.130.122.124/api/audio/', httpOptions)
  }

  // get single audio file
  getSingleAudio(id) {
    return this.http.get(`http://102.130.122.124/api/audio/${id}/`, httpOptions)

  }

  // delete audio file
  deleteAudio(id) {
    return this.http.delete(`http://102.130.122.124/api/audio/${id}/`, httpOptions)
  }

  // edit audio
  editAudio(id, name, file, desc) {
    let formData = new FormData()
    formData.append('audio_file', file)
    formData.append('name', name)
    formData.append('description', desc)
    return this.http.put(`http://102.130.122.124/api/audio/${id}/`, formData, httpOptions)
  }

}
