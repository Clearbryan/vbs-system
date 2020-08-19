import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PhonebookService } from 'src/app/services/phonebook/phonebook.service';

@Component({
  selector: 'app-phonebook',
  templateUrl: './phonebook.component.html',
  styleUrls: ['./phonebook.component.css']
})
export class PhonebookComponent implements OnInit {

  phonebooks: any = []
  success: Boolean = false
  failure: Boolean = false
  p: number = 1

  constructor(private router: Router, private contactsService: PhonebookService) { }

  ngOnInit(): void {
    this.contactsService.getAllContacts().subscribe((response: any) => {
      console.log(response)
      response.map((res: any) => {
        res.created_on = new Date(res.created_on).toDateString()
      })
      this.phonebooks = response
    }, error => {
      // handle error
      console.log(error)
    })

  }

  // delete phonebook
  delete(id) {
    this.contactsService.deletePhoneBook(id).subscribe((status: any) => {
      this.success = true;
      setTimeout(() => {
        this.success = false
      }, 2000)
    }, error => {
      // handle error
      console.log(error)
      this.failure = true
      setTimeout(() => {
        this.failure = false
      }, 2000)

    })

  }

}
