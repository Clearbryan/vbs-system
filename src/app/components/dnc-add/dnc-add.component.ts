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

  ngOnInit(): void {
  }

  addNewDnc() {
    this.dncService.addDnc(this.name, this.description).subscribe((response) => {
      console.log(response);
      this.success = true;
      setTimeout(() => {
        this.router.navigate(['/user/dnc'])
        this.success = false;
      }, 2000)
    }, error => {
      // handle error
      console.log(error)
      this.failure = true;

      setTimeout(() => {
        this.failure = false
      }, 2000)
    })
  }


}
