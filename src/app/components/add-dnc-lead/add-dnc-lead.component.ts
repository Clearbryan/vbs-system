import { DncService } from 'src/app/services/dnc/dnc.service';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { PhonebookService } from 'src/app/services/phonebook/phonebook.service';

@Component({
  selector: 'app-add-dnc-lead',
  templateUrl: './add-dnc-lead.component.html',
  styleUrls: ['./add-dnc-lead.component.css']
})
export class AddDncLeadComponent implements OnInit {

  lead: any = null
  leadId: Number = null
  success: Boolean = false;
  failure: Boolean = false;
  successMessage: String = ""
  failureMessage: String = ""
  

  constructor(private router: Router, private http: HttpClient, private activeRoute: ActivatedRoute, private contactsService: PhonebookService, private dncService: DncService) {

  }

  ngOnInit(): void {
    this.activeRoute.params.subscribe((params: Params) => {
      this.leadId = Number(params.id)
    })
  }

  addLeads() {
    this.dncService.addDncLead(this.leadId, this.lead).subscribe((response: any) => {
      this.success = true
      this.successMessage = "Lead contact successfully uploaded."
      setTimeout(() => {
        this.success = false
        this.successMessage = ""
        this.router.navigate(['/user/dnc'])
      }, 2000)
    }, error => {
        // handle error
        this.failure = true
        this.failureMessage = error.message
        setTimeout(() => {
          this.failure = false
          this.failureMessage = ""
        }, 2000)
    })
  }

}
