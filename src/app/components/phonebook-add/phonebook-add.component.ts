import { PhonebookService } from './../../services/phonebook/phonebook.service';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-phonebook-add',
  templateUrl: './phonebook-add.component.html',
  styleUrls: ['./phonebook-add.component.css']
})
export class PhonebookAddComponent implements OnInit {

  filename: String = '';
  filedesc: String = '';
  file: any;
  success: Boolean = false;
  failure: Boolean = false;

  constructor(private router: Router, private http: HttpClient, private contactsService: PhonebookService) {

  }

  ngOnInit(): void {


  }

  uploadFile(e) {
    this.file = e.target.files[0];
  }
  // add phonebook
  importContact() {
    // console.log(this.file.name)
    this.contactsService.addContact(this.filename, this.filedesc, this.file).subscribe((response: any) => {
      console.log(response)
      this.success = true;
      setTimeout(() => {
        this.success = false
        this.router.navigate(['user/phonebook'])
      }, 2000)

    }, error => {

      console.log(error)
      this.failure = true;
      setTimeout(() => {
        this.failure = false
      }, 2000)
    })

  }



}
