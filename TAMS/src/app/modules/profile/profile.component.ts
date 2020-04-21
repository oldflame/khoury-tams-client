import { Component, OnInit } from "@angular/core";
import { UserService } from "../../services/user.service";
import { ProfileService } from "../../services/profile.service";
import { Router, ActivatedRoute } from "@angular/router";
import { User } from "src/app/models/user";
import * as _ from "lodash";

@Component({
  selector: "profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.css"],
})
export class ProfileComponent implements OnInit {
  constructor(
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute,
    private profileService: ProfileService
  ) {}

  loggedInUser: any = {
    firstName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
    role: "",
  };
  editing = false;
  userId: "";
  allDataForCurrentUser: any;
  currentUser: User;
  followedUser: User;

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      if (params.profileId != null) {
        this.editing = true;
      } else {
        this.editing = false;
      }
    });
    this.userId = JSON.parse(this.userService.getUserData())._id;
    this.profileService.getUserById(this.userId).then((user) => {
      this.loggedInUser = user;
    });
    this.userService.findUserById(this.userId).subscribe((user) => {
      this.allDataForCurrentUser = user;
    });

    this.currentUser = JSON.parse(this.userService.getUserData());
  }

  clicked() {
    if (!this.editing) {
      this.router.navigate([`/profile/${this.loggedInUser._id}`]);
    } else {
      fetch(`http://localhost:7000/profile/${this.loggedInUser._id}`, {
        method: "PUT",
        body: JSON.stringify(this.loggedInUser),
        headers: {
          "content-type": "application/json",
        },
      })
        .then((response) => {
          console.log(response.json());
        })
        .then((updatedUser) => {
          this.loggedInUser = updatedUser;
          console.log(this.loggedInUser);
        });
      this.router.navigate(["/profile"]);
    }
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
    this.userService
      .followUser(this.currentUser, this.followedUser)
      .subscribe((res: boolean) => {
        if (res) {
          this.userService.findUserById(this.userId).subscribe((user) => {
            this.allDataForCurrentUser = user;
          });
        }
      });
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
    this.userService
      .unFollowUser(this.currentUser, this.followedUser)
      .subscribe((res: boolean) => {
        if (res) {
          this.userService.findUserById(this.userId).subscribe((user) => {
            this.allDataForCurrentUser = user;
          });
        }
      });
  }
}
