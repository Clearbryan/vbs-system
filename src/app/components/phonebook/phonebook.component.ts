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
