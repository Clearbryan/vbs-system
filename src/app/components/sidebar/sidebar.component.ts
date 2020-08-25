import { Router } from '@angular/router';
import { UserService } from './../../services/user/user.service';
import { Component, Input, OnInit, AfterContentInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit, AfterContentInit {
  user: any = {}
  balanceColor: String = ''
  data: {} = {}

  constructor(private userService: UserService, private router: Router) { }

  ngAfterContentInit(): void {
    // get company info
    this.userService.getCompanyInfo().subscribe((details: any) => {
    
      this.data = details[0]
    }, error => {
      // handle error
      console.log(error)
    })

    console.log(this.data[0])
    this.userService.getUserBalance().subscribe((response: any) => {
      console.log(response)
      response[0].minutes = (response[0].minutes / 60).toFixed(0)
      this.user = response[0]
      if (this.user.minutes <= 50) {
        this.balanceColor = 'display-income text-danger'
      } else {
        this.balanceColor = 'display-income text-success'
      }
    })
  }

  ngOnInit() {

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
