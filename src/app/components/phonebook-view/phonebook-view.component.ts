import { Router, ActivatedRoute, Params } from '@angular/router';
import { PhonebookService } from 'src/app/services/phonebook/phonebook.service';
import { Component, OnInit } from '@angular/core';
import { DncService } from 'src/app/services/dnc/dnc.service';

@Component({
  selector: 'app-phonebook-view',
  templateUrl: './phonebook-view.component.html',
  styleUrls: ['./phonebook-view.component.css']
})
export class PhonebookViewComponent implements OnInit {
  phonebookId: Number = null
  phonebook: any = {}
  error: any = {}
  success: Boolean = true
  failure: Boolean
  successMessage: String = ""
  errorMessage: String = ""

  constructor(private phonebookService: PhonebookService,private dncService: DncService, private activeRoute: ActivatedRoute) { }

  ngOnInit(): void {
    // get phonebook id
    this.activeRoute.params.subscribe((params: Params) => {
      this.phonebookId = Number(params.id)
    }, error => {
      this.failure = true
      this.errorMessage = error.message
      setTimeout(() => {
        this.failure = false
        this.errorMessage = ""
      }, 2000)
    })

    this.phonebookService.getPhonebook(this.phonebookId).subscribe((phonebook: any) => {
      console.log(phonebook)
      phonebook.created_on = new Date(phonebook.created_on).toDateString()
      this.phonebook = phonebook
      this.success = true
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

    // get leads
    this.phonebookService.getLeads(this.phonebookId).subscribe((leads: any) => {
      console.log(leads)
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
