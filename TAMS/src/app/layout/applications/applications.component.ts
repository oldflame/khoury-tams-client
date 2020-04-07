import {Component, OnInit} from '@angular/core';
import {Route} from "@angular/router";
import {UserService} from "../../services/user.service";

@Component({
  selector: 'applications',
  templateUrl: './applications.component.html',
  styleUrls: ['./applications.component.css']
})
export class ApplicationsComponent implements OnInit {

  constructor(private service: UserService,
              public router: Route) {
  }

  userName: string;

  ngOnInit(): void {
    this.userName = this.service.getUserData().FirstName;
  }

}
