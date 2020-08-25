import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { PhonebookService } from 'src/app/services/phonebook/phonebook.service';

@Component({
  selector: 'app-add-leads',
  templateUrl: './add-leads.component.html',
  styleUrls: ['./add-leads.component.css']
})
export class AddLeadsComponent implements OnInit {

  lead: any = null
  phonebookId: Number = null
  success: Boolean = false;
  failure: Boolean = false;
  successMessage: String = ""
  failureMessage: String = ""
  

  constructor(private router: Router, private http: HttpClient, private activeRoute: ActivatedRoute, private contactsService: PhonebookService) {

  }

  ngOnInit(): void {
    this.activeRoute.params.subscribe((params: Params) => {
      this.phonebookId = Number(params.id)
    })
  }

  addLeads() {
    this.contactsService.addLead(this.phonebookId, this.lead).subscribe((response: any) => {
      this.success = true
      this.successMessage = "Lead contact successfully uploaded."
      setTimeout(() => {
        this.success = false
        this.successMessage = ""
        this.router.navigate(['/user/phonebook'])
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
