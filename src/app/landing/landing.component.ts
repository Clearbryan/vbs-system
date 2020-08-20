import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user/user.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {

  username: String = ""
  password: String = ""
  loginSuccess: Boolean = false
  loginFailure: Boolean = false

  constructor(private router: Router, private userService: UserService) { }

  ngOnInit(): void {
  }

  login() {
    this.userService.userLogin(this.username, this.password).subscribe((response: any) => {
      console.log(response);
      localStorage.removeItem('token');
      localStorage.setItem('token', response.token);
      this.loginSuccess = true;
      setTimeout(() => {
        this.loginSuccess = false;
        this.router.navigate(['/user/dashboard'])
      }, 2000)
    }, err => {
      // handle error
      console.log(err);
      this.loginFailure = true
      setInterval(() => {
        this.loginFailure = false
      }, 1000)
    })

  }

}
