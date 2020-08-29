import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { AudioService } from 'src/app/services/audio/audio.service';

@Component({
  selector: 'app-audio-edit',
  templateUrl: './audio-edit.component.html',
  styleUrls: ['./audio-edit.component.css']
})
export class AudioEditComponent implements OnInit {

  success: Boolean = false;
  failure: Boolean = false;
  successMessage: String = ""
  failureMessage: String = ""
  name: String = '';
  desc: String = '';
  file: any;
  audioId: Number = null
  audio: any = {}

  constructor(private router: Router, private audioService: AudioService, private activeRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activeRoute.params.subscribe((params: Params) => {
      this.audioId = Number(params.id)
    }, error => {
      console.log(error)
      this.failure = true;
      this.failureMessage = `${error.message}`
    setTimeout(() => {
      this.failure = false
      this.failureMessage = ""
    }, 2000)
    })

    // get audio data
    this.audioService.getSingleAudio(this.audioId).subscribe((audio: any) => {
      this.audio = audio
      console.log(audio)
    }, error => {
        // handle error
        console.log(error)
        this.failure = true;
        this.failureMessage = `${error.message}`
      setTimeout(() => {
        this.failure = false
        this.failureMessage = ""
      }, 2000)
    })
  }

  getFile(e) {
    this.file = e.target.files[0]

  }
  // edit audio
  editAudioFile(id) {
    this.audioService.editAudio(id, this.audio.name, this.file, this.audio.description).subscribe((response: any) => {
      console.log(response)
      this.success = true;
      this.successMessage = "Audio update successfull."
      setTimeout(() => {
        this.success = false
        this.successMessage = ""
        this.router.navigate(['/user/audio'])
      }, 2000)
    }, error => {
        // handle error
        console.log(error)
        this.failure = true;
        this.failureMessage = `${error.message}`
      setTimeout(() => {
        this.failure = false
        this.failureMessage = ""
      }, 2000)
    })

  }

}
