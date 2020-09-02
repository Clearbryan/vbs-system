import { Observable, interval } from 'rxjs';
import { startWith, switchMap } from 'rxjs/operators'
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  @Input()platform: any = {};
  @Input() user: any = {};
  @Input()test: Observable<{}>
  failure: Boolean
  success: Boolean
  errorMessage: String = ""
  successMessage: String = ""

  constructor(
    private router: Router,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    interval(500).subscribe(() => {
      this.platform.date = new Date().toDateString()
      this.platform.time = new Date().toLocaleTimeString()
    })


   

  }

  // logout user
  logout() {
    this.userService.logoutUser().subscribe((status) => {
      localStorage.removeItem('token')
      this.router.navigate(['/'], { fragment: "loggedout" })

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
