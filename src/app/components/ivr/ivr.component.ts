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
    })
  }

  deleteIvr(i) {
    // delete ivr
    alert('Ivr menu deleted')

  }


}
