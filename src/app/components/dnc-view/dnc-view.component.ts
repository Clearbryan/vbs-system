import { DncService } from 'src/app/services/dnc/dnc.service';
import { Component, OnInit } from '@angular/core';
import { Params, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-dnc-view',
  templateUrl: './dnc-view.component.html',
  styleUrls: ['./dnc-view.component.css']
})
export class DncViewComponent implements OnInit {
  dncId: Number = null
  dncContact: any = []

  constructor(private dncService: DncService, private activeRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activeRoute.params.subscribe((params: Params) => {
      console.log(params.id)
      this.dncId = Number(params.id)
    })

    // get dnc contacts
    this.dncService.getDncContacts(this.dncId).subscribe((contacts: any) => {
      console.log(contacts)
      this.dncContact = contacts
    }, error => {
      // handle error 
      console.log(error)
    })
  }
  // dncId(dncId: any) {
  //   throw new Error('Method not implemented.');
  // }

}
