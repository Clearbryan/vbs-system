import { Router } from '@angular/router';
import { UserService } from './../../services/user/user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  user: any = {}
  balanceColor: String = ''

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.userService.getUserBalance().subscribe((response: any) => {
      console.log(response)
      this.user = response[0]
      if (this.user.balance <= 50) {
        this.balanceColor = 'display-income text-danger'
      } else {
        this.balanceColor = 'display-income text-success'
      }
    })
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
