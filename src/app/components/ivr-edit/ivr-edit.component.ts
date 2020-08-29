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
  errorMessage: String = ""
  successMessage: String = ""
  surveyId: Number = null
  survey: any = {}
  surveyData = []

  constructor(private audioService: AudioService, private ivrService: IvrService, private activeRoute: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    // get all ivr menus
    this.activeRoute.params.subscribe((params: Params) => {
      this.surveyId = Number(params.id)
    }, error => {
        console.log(error)
      this.failure = true
      this.errorMessage = error.message
      setTimeout(() => {
        this.failure = false
        this.errorMessage = ""
      }, 2000)
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
        this.failure = true
        this.errorMessage = error.message
        setTimeout(() => {
          this.failure = false
          this.errorMessage = ""
        }, 2000)
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
        this.failure = true
        this.errorMessage = error.message
        setTimeout(() => {
          this.failure = false
          this.errorMessage = ""
        }, 2000)

    })
  }

  check() {

  }

  submitIvr(id) {
    this.ivrService.editIvr(id, this.name, this.audio, this.desc, JSON.stringify(this.surveyData)).subscribe((response: any) => {
      this.success = true;
      this.successMessage = "Survey menu successfully added"
      setTimeout(() => {
        this.success = false
        this.successMessage = ""
        this.router.navigate(['/user/ivr'])
      }, 2000)

    }, error => {
      // handle error
      console.log(error)
      this.failure = true
      this.errorMessage = error.message
      setTimeout(() => {
        this.failure = false
        this.errorMessage = ""
      }, 2000)
    })
  }

}
