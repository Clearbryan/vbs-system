import { UserService } from 'src/app/services/user/user.service';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  @Output() data: {}

  constructor(private userService: UserService) { }

  ngOnInit(): void {


  }

}
