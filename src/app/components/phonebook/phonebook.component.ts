import { AfterContentInit, Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { PhonebookService } from 'src/app/services/phonebook/phonebook.service';

@Component({
  selector: 'app-phonebook',
  templateUrl: './phonebook.component.html',
  styleUrls: ['./phonebook.component.css']
})
export class PhonebookComponent implements OnInit, AfterContentInit {

  @Input()phonebooks: any = []
  success: Boolean = false
  failure: Boolean = false
  errorMessage: String = ""
  successMessage: String = ""
  p: number = 1
  id: Number = null
  taskId: any = null
  uploading: Boolean
  uploaded: Boolean
  progressResult: any = {}

  constructor(private router: Router, private contactsService: PhonebookService, private activeRoute: ActivatedRoute) { }

  // ngAfterContentInit(): void {
  //   setInterval(() => {
      
  //   }, 10000)
  // }


  ngAfterContentInit() {
   
  }

  ngOnInit(): void {

    this.activeRoute.queryParams.subscribe((params: Params) => {
      this.id = Number(params.id)
    }, error => {
      this.failure = true
      this.errorMessage = error.message
      setTimeout(() => {
        this.failure = false
        this.errorMessage = ""
      }, 2000)
    })
     // check progress
     this.contactsService.getAllContacts().subscribe((response: any) => {
       console.log(response)
      response.map((res: any) => {
        res.created_on = new Date(res.created_on).toDateString()
      })
      this.phonebooks = response
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
    
    
    this.contactsService.progress(localStorage.getItem('progressId')).subscribe((progress: any) => {
      let test = JSON.parse(progress.result)
      // console.log(test)
      if (typeof(test) === "string" && test.startsWith("message")) {
       
        console.log(progress)
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
      } else {
        this.uploaded = false
      }
        
     }, error => {
         // handle progress error
          console.log(error)
          // this.failure = true
      this.errorMessage = error.message
      setTimeout(() => {
        this.failure = false
        this.errorMessage = ""
      }, 2000)
     })
       
   
    
  }

  // delete phonebook
  delete(id) {
    this.contactsService.deletePhoneBook(id).subscribe((status: any) => {
      this.success = true;
      this.successMessage = "Phonebook successfully deleted"
      setTimeout(() => {
        this.successMessage = ""
        this.success = false
      }, 2000)
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
