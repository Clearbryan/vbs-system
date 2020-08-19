import { ActivatedRoute, Params } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { DncService } from 'src/app/services/dnc/dnc.service';

@Component({
  selector: 'app-dnc',
  templateUrl: './dnc.component.html',
  styleUrls: ['./dnc.component.css']
})
export class DncComponent implements OnInit {

  dnc: any = []
  p: number = 1
  dncId: Number = null

  constructor(private dncService: DncService, private activeRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.dncService.getAllDnc().subscribe((response: any) => {
      console.log(response)
      response.map((res: any) => {
        res.created_date = new Date(res.created_date).toDateString()
      })
      this.dnc = response;

    }, error => {
      // handle error
      console.log(error)
    })

  }

  viewDnc() {

  }
}
