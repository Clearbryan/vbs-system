import { PhonebookService } from './../../services/phonebook/phonebook.service';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

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
  errorMessage: String = ""
  successMessage: String = ""
  uploading: Boolean
  uploaded: Boolean
  progressResult: any = {}
  nextButton: Boolean

  constructor(private router: Router, private http: HttpClient, private contactsService: PhonebookService, private activeRoute: ActivatedRoute) {

  }

  ngOnInit(): void {
    this.activeRoute.queryParams.subscribe((params: Params) => {
      if (params !== {}) {
        if (params.action === 'quickstart') {
          this.nextButton = true
        } else {
          this.nextButton = false
        }
      } else {
        this.nextButton = false
      }
    }, error => {
      this.failure = true
      this.errorMessage = error.message
      setTimeout(() => {
        this.failure = false
        this.errorMessage = ""
      }, 2000)
    })


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
            this.failure = true
        this.errorMessage = error.message
        setTimeout(() => {
          this.failure = false
          this.errorMessage = ""
        }, 2000)
       })
         
       }, 2000)

    }, error => {

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
