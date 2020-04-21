import { Component, OnInit } from "@angular/core";
import { UserService } from "src/app/services/user.service";
import { User } from "src/app/models/user";
import { Observable } from "rxjs";
import { MatTabChangeEvent } from "@angular/material/tabs";
import * as _ from 'lodash';

@Component({
  selector: "users",
  templateUrl: "./users.component.html",
  styleUrls: ["./users.component.css"],
})
export class UsersComponent implements OnInit {
  users$: Observable<User[]>;
  students: User[] = [];
  faculty: User[] = [];
  currentUser: User;
  followedUser: User;
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
    this.currentUser = JSON.parse(this.userService.getUserData());
    this.users$ = this.userService.users$;
    this.userService.getAllUsers().subscribe();
    this.users$.subscribe((users) => {
      console.log("Users", users);
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

  followUser($event: any) {
    console.log($event.user);
    if (!$event.user.followers) {
      // tslint:disable-next-line:no-string-literal
      $event.user["followers"] = [];
    }
    $event.user.followers.push(this.currentUser._id);
    $event.user.followers = _.uniq($event.user.followers);

    this.followedUser = $event.user;
    if (!this.currentUser.following) {
      this.currentUser.following = [];
    }
    this.currentUser.following.push($event.user._id);
    this.currentUser.following = _.uniq(this.currentUser.following);
    this.userService.followUser(this.currentUser, this.followedUser).subscribe();
  }
  unFollowUser($event: any) {
    const followedUserIndex = this.currentUser.following.indexOf(
      $event.user._id
    );
    if (followedUserIndex != -1) {
      this.currentUser.following.splice(followedUserIndex, 1);
    }

    const followingUserIndex = $event.user.followers.indexOf(
      this.currentUser._id
    );
    if (followedUserIndex != -1) {
      $event.user.followers.splice(followingUserIndex, 1);
    }
    this.followedUser = $event.user;
    this.userService.unFollowUser(this.currentUser, this.followedUser).subscribe();
  }
}
