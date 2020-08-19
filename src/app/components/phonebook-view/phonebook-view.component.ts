import { Router, ActivatedRoute, Params } from '@angular/router';
import { PhonebookService } from 'src/app/services/phonebook/phonebook.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-phonebook-view',
  templateUrl: './phonebook-view.component.html',
  styleUrls: ['./phonebook-view.component.css']
})
export class PhonebookViewComponent implements OnInit {
  phonebookId: Number = null
  constructor(private phonebookService: PhonebookService, private activeRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activeRoute.params.subscribe((params: Params) => {
      this.phonebookId = Number(params.id)
    })

    this.phonebookService.getLeads(this.phonebookId).subscribe((leads: any) => {
      console.log(leads)
    }, error => {
      // handle error
      console.log(error)
    })

  }

}
