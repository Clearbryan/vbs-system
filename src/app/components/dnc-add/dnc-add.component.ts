import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DncService } from 'src/app/services/dnc/dnc.service';

@Component({
  selector: 'app-dnc-add',
  templateUrl: './dnc-add.component.html',
  styleUrls: ['./dnc-add.component.css']
})
export class DncAddComponent implements OnInit {

  constructor(private dncService: DncService, private router: Router) { }
  name: String = '';
  description: String = '';
  success: Boolean = false
  failure: Boolean = false
  errorMessage: String = ""
  successMessage: String = ""

  ngOnInit(): void {
  }

  addNewDnc() {
    this.dncService.addDnc(this.name, this.description).subscribe((response) => {
      console.log(response);
      this.success = true;
      this.successMessage = "Dnc List successfully added"
      setTimeout(() => {
        this.router.navigate(['/user/dnc'])
        this.success = false;
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
