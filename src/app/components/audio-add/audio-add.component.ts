import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AudioService } from 'src/app/services/audio/audio.service';

@Component({
  selector: 'app-audio-add',
  templateUrl: './audio-add.component.html',
  styleUrls: ['./audio-add.component.css']
})
export class AudioAddComponent implements OnInit {

  success: Boolean = false;
  failure: Boolean = false;
  name: String = '';
  desc: String = '';
  file: any;
  successMessage: String = ""
  errorMessage: String = ""

  constructor(private router: Router, private audioService: AudioService) { }

  ngOnInit(): void {
  }

  getFile(e) {
    this.file = e.target.files[0]

  }

  uploadAudioFile() {
    console.log(this.file)
    this.audioService.uploadAudio(this.name, this.desc, this.file).subscribe((response: any) => {
      console.log(response)
      this.success = true;
      this.successMessage = "Audio file upload success"
      setTimeout(() => {
        this.success = false
        this.successMessage = ""
        this.router.navigate(['/user/audio'])
      }, 2000)
    }, error => {
      // handle error
      console.log(error)
        this.failure = true;
        this.errorMessage = error.message
      setTimeout(() => {
        this.failure = false
        this.errorMessage = ""
      }, 2000)
    })
  }

}
