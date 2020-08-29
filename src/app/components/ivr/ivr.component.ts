import { Component, OnInit } from '@angular/core';
import { IvrService } from 'src/app/services/ivr/ivr.service';

@Component({
  selector: 'app-ivr',
  templateUrl: './ivr.component.html',
  styleUrls: ['./ivr.component.css']
})
export class IvrComponent implements OnInit {

  surveys: any = []
  p: number = 1
  failure: Boolean
  success: Boolean
  errorMessage: String = ""
  successMessage: String = ""

  constructor(private ivrService: IvrService) { }

  ngOnInit(): void {
    this.ivrService.getAllIvrMenus().subscribe((survey: any) => {
      survey.map((res: any) => {
        res.created_date = new Date(res.created_date).toDateString()
      })
      this.surveys = survey
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

  deleteIvr(i) {
    // delete ivr
    alert('Ivr menu deleted')

  }


}
