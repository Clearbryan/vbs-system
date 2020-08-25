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
  uploading: Boolean
  uploaded: Boolean
  progressResult: any  = {}

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
      // check progress
      setInterval(() => {
        this.contactsService.progress(response.id).subscribe((progress: any) => {
          if (progress.status === 'PROGRESS') {
            this.uploading = true
            const res = JSON.parse(progress.result)
            res.percent = `${res.percent}%`
            this.progressResult = res
            return
            
          } 
          if (progress.status === 'SUCCESS') {
            this.uploaded = true
            this.uploading = false
            setTimeout(() => {
              this.success = false
              this.uploaded = false
              this.router.navigate(['user/phonebook'])
   
            }, 3000)
            return
          }
       }, error => {
           // handle progress error
           console.log(error)
       })
         
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
