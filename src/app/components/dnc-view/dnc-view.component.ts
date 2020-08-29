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
  dnc: any = {}
  errorMessage: String = ""
  successMessage: String = ""
  failure: Boolean
  success: Boolean
  p: number = 1

  constructor(private dncService: DncService, private activeRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activeRoute.params.subscribe((params: Params) => {
      console.log(params.id)
      this.dncId = Number(params.id)
    }, error => {
        console.log(error)
        this.failure = true
        this.errorMessage = error.message
        setTimeout(() => {
          this.failure = false
          this.errorMessage = ""
        }, 2000)
    })

    // get dnc contacts
    this.dncService.getDncContacts(this.dncId).subscribe((contacts: any) => {
      console.log(contacts)
      this.dncContact = contacts
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

    // get dnc details
    this.dncService.getDnc(this.dncId).subscribe((dnc: any) => {
      dnc.created_date = new Date(dnc.created_date).toDateString()
      this.dnc = dnc
    }, error => {
        this.errorMessage = error.message
        this.failure = true
        setTimeout(() => {
          this.failure = false
          this.errorMessage = ""
        })
    })
  }
  
  // get dnc leads
  

}
