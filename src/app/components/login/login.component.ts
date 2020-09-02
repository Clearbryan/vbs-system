import { UserService } from './../../services/user/user.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username: String = ""
  password: String = ""
  loginSuccess: Boolean = false
  loginFailure: Boolean = false
  errorMessage: String = "" 
  successMessage: String = ""
  constructor(private router: Router, private userService: UserService) { }

  ngOnInit(): void {
  }

  login() {
    this.userService.userLogin(this.username, this.password).subscribe((response: any) => {
      console.log(response);
      localStorage.setItem('token', response.token);
      this.loginSuccess = true;
      this.successMessage = "Success...redirecting to dashboard."
      setTimeout(() => {
        this.loginSuccess = false;
        this.successMessage = ""
        this.router.navigate(['/user/dashboard'])
      }, 2000)
    }, err => {
      // handle error
      console.log(err);
        this.loginFailure = true
        this.errorMessage = err.message
      setInterval(() => {
        this.loginFailure = false
        this.errorMessage = ""
      }, 2000)
    })

  }

}
