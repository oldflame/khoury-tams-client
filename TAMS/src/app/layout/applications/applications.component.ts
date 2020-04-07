import {Component, OnInit} from '@angular/core';
import { Router} from "@angular/router";
import {UserService} from "../../services/user.service";

@Component({
  selector: 'applications',
  templateUrl: './applications.component.html',
  styleUrls: ['./applications.component.css']
})
export class ApplicationsComponent implements OnInit {

  constructor(private service: UserService,
              public router: Router) {
  }

  userName: string;

  ngOnInit(): void {
    this.userName = JSON.parse(this.service.getUserData()).firstName;
    console.log(this.userName);
  }

}
