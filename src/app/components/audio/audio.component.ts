import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AudioService } from 'src/app/services/audio/audio.service';

@Component({
  selector: 'app-audio',
  templateUrl: './audio.component.html',
  styleUrls: ['./audio.component.css']
})
export class AudioComponent implements OnInit {

  success: Boolean = false;
  failure: Boolean = false;
  audios: any = [];
  name: String = ""
  description: String = ""
  file: any
  p: number = 1

  constructor(private audioService: AudioService, private activeRoute: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.audioService.getAllAudiofiles().subscribe((response: any) => {
      console.log(response)
      response.map((res: any) => {
        res.created_at = new Date(res.created_at).toDateString()
      })
      this.audios = response
    }, error => {
      // handle error
      console.log(error)

    })

  }

  delete(id) {
    this.audioService.deleteAudio(id).subscribe((status) => {
      this.success = true
      setTimeout(() => {
        this.success = false
        this.router.navigateByUrl('/user/audio')
      }, 2000)
    }, error => {
      // handle error
      console.log(error)
      this.failure = true;
      setTimeout(() => {
        this.failure = false
      }, 2000)
    })

  }


}
