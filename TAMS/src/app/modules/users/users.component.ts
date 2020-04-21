import { Component, OnInit } from "@angular/core";
import { UserService } from "src/app/services/user.service";
import { User } from "src/app/models/user";
import { Observable } from "rxjs";
import { MatTabChangeEvent } from "@angular/material/tabs";

@Component({
  selector: "users",
  templateUrl: "./users.component.html",
  styleUrls: ["./users.component.css"],
})
export class UsersComponent implements OnInit {
  users$: Observable<User[]>;
  students: User[] = [];
  faculty: User[] = [];
  constructor(private userService: UserService) {}

  tabChanged(eventArgs: MatTabChangeEvent) {
    console.log(eventArgs);
    this.users$.subscribe((users) => {
      if (users) {
        this.students = [];
        this.faculty = [];
        users.forEach((user) => {
          const userType = user.role;
          console.log(userType);
          if (userType == "Faculty") {
            this.faculty.push(user);
          } else if (userType == "Student") {
            this.students.push(user);
          }
        });
      }
    });
  }

  ngOnInit(): void {
    this.users$ = this.userService.users$;
    this.userService.getAllUsers().subscribe();
    this.users$.subscribe((users) => {
      if (users) {
        this.students = [];
        users.forEach((user) => {
          const userType = user.role;
          console.log(userType);
          if (userType == "Faculty") {
            this.faculty.push(user);
          } else if (userType == "Student") {
            this.students.push(user);
          }
        });
      }
    });
  }
}
