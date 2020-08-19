import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  platform: any = {};
  user: any = {};

  constructor(
    private router: Router,
    private userService: UserService
  ) { }

  ngOnInit(): void {

  }

  // logout user
  logout() {
    this.userService.logoutUser().subscribe((status) => {
      localStorage.removeItem('token')
      console.log('Logged out', status)
      this.router.navigate(['/'], { fragment: "loggedout" })

    }, error => {
      // handle error
      console.log(error)
    })
  }

}
