import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { PhonebookService } from 'src/app/services/phonebook/phonebook.service';

@Component({
  selector: 'app-phonebook-edit',
  templateUrl: './phonebook-edit.component.html',
  styleUrls: ['./phonebook-edit.component.css']
})
export class PhonebookEditComponent implements OnInit {

  filename: String = '';
  filedesc: String = '';
  file: any;
  success: Boolean = false;
  failure: Boolean = false;
  successMessage: String = ""
  failureMessage: String = ""
  phonebookId: Number = null
  phonebook: any = {}

  constructor(private router: Router, private http: HttpClient, private activeRoute: ActivatedRoute, private contactsService: PhonebookService) {

  }

  ngOnInit(): void {
    this.activeRoute.params.subscribe((params: Params) => {
      this.phonebookId = Number(params.id)
    })
    this.contactsService.getPhonebook(this.phonebookId).subscribe((phonebook: any) => {
      console.log(phonebook)
      this.phonebook = phonebook
    }, error => {
      // handle error
      console.log(error)
    })

  }

  uploadFile(e) {
    this.phonebook.file = e.target.files[0];
  }
  // edit phonebook
  updatePhonebook() {
    console.log(this.phonebook)
    this.contactsService.updatePhonebook(this.phonebookId, this.phonebook.name, this.phonebook.file, this.phonebook.description).subscribe((response: any) => {
      console.log(response)
      this.success = true;
      this.successMessage = "Phonebook updated successfully."
      setTimeout(() => {
        this.success = false
        this.successMessage = ""
        this.router.navigate(['user/phonebook'])
      }, 2000)

    }, error => {

      console.log(error)
      this.failure = true;
      this.failureMessage = `${error.message}`
      setTimeout(() => {
        this.failure = false
        this.failureMessage = ""
      }, 2000)
    })
  }
}
