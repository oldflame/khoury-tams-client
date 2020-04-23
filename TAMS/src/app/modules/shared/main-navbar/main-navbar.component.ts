import { Component, OnInit } from "@angular/core";
import { Router, NavigationStart, NavigationEnd } from "@angular/router";
import { UserService } from "src/app/services/user.service";
import { SecureStorageService } from "src/app/services/secure-storage.service";
import { User } from "src/app/models/user";
import * as _ from "lodash";

@Component({
  selector: "main-navbar",
  templateUrl: "./main-navbar.component.html",
  styleUrls: ["./main-navbar.component.css"],
})
export class MainNavbarComponent implements OnInit {
  currentUser: User;
  constructor(
    private router: Router,
    private userService: UserService,
    private secureStorageService: SecureStorageService
  ) {
    if (this.userService.isAuthenticated()) {
      this.currentUser = JSON.parse(this.secureStorageService.getValue("user"));
    }
  }
  activeLink: string;
  links = [
    {
      viewValue: "Feed",
      route: "/account/feed",
    },
    {
      viewValue: "Home",
      route: "/account/home",
    },
    {
      viewValue: "Applications",
      route: "/account/applications",
    },
    {
      viewValue: "Acceptance",
      route: "/account/ta-acceptance/accept",
    },
    {
      viewValue: "TA Applications",
      route: "/account/ta-applications/view",
    },
    {
      viewValue: "Profile",
      route: "/account/profile",
    },
    {
      viewValue: "Users",
      route: "/account/follow-users",
    },
  ];

  ngOnInit(): void {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        console.log("route", event.url);
        this.activeLink = event.url;
      }
    });

    this.activeLink = this.router.url;

    if (this.currentUser && this.currentUser.role == "Student") {
      this.links.splice(2, 0, {
        viewValue: "Hours",
        route: "/account/fill",
      });

      this.links.splice(
        _.findIndex(this.links, { viewValue: "TA Applications" }),
        1
      );
    }

    if (this.currentUser && this.currentUser.role == "Faculty") {
      this.links.splice(2, 1);
    }
  }

  signOut() {
    this.router.navigate(["/login"]);
    this.userService.signout();
  }
}
