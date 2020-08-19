import { ActivatedRoute, Params, Router } from '@angular/router';
import { IvrService } from 'src/app/services/ivr/ivr.service';
import { AudioService } from 'src/app/services/audio/audio.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ivr-edit',
  templateUrl: './ivr-edit.component.html',
  styleUrls: ['./ivr-edit.component.css']
})
export class IvrEditComponent implements OnInit {
  name: String = ''
  desc: String = ''
  audios: any = []
  audio: String = ''
  success: Boolean = false
  failure: Boolean = false
  surveyId: Number = null
  survey: any = {}
  surveyData = []

  constructor(private audioService: AudioService, private ivrService: IvrService, private activeRoute: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    // get all ivr menus
    this.activeRoute.params.subscribe((params: Params) => {
      this.surveyId = Number(params.id)
    })
    this.ivrService.getIvrMenu(this.surveyId).subscribe((survey: any) => {
      console.log(survey)
      const { name, description } = survey
      this.name = name
      this.desc = description
      this.survey = survey
      this.surveyData = survey.data
    }, error => {
      // handle the error 
      console.log(error)
    })
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

  check() {

  }

  submitIvr(id) {
    this.ivrService.editIvr(id, this.name, this.audio, this.desc, JSON.stringify(this.surveyData)).subscribe((response: any) => {
      this.success = true;
      setTimeout(() => {
        this.success = false
        this.router.navigate(['/user/ivr'])
      }, 1500)

    }, error => {
      // handle error
      console.log(error)
      this.failure = true
      setTimeout(() => {
        this.failure = false
      }, 1500)
    })
  }

}
