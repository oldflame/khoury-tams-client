import { Component, OnInit } from "@angular/core";
import { Router, NavigationStart, NavigationEnd } from "@angular/router";
import { UserService } from "src/app/services/user.service";
import { SecureStorageService } from "src/app/services/secure-storage.service";
import { User } from "src/app/models/user";

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
    this.currentUser = JSON.parse(this.secureStorageService.getValue("user"));
  }
  activeLink: string;
  links = [
    {
      viewValue: "Home",
      route: "/account/home",
    },
    {
      viewValue: "Applications",
      route: "/account/applications",
    },
    {

      viewValue: "Profile",
      route: "/profile"
    },
    {
      viewValue: "Users",
      route: "/account/follow-users",
    }
  ];

  ngOnInit(): void {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        console.log("route", event.url);
        this.activeLink = event.url;
      }
    });

    this.activeLink = this.router.url;

    if (this.currentUser.role == "Student") {
      this.links.splice(1, 0, {
        viewValue: "Hours",
        route: "/account/fill",
      });
    }
  }

  signOut() {
    this.router.navigate(["/login"]);
    this.userService.signout();
  }
}
