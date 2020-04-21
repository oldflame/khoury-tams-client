import { Component, OnInit } from "@angular/core";
import { UserService } from "../../services/user.service";
import { ProfileService } from "../../services/profile.service";
import { Router, ActivatedRoute } from "@angular/router";

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
      this.loggedInUser = user[0];
    });
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
}
