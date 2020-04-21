import { Component, OnInit } from "@angular/core";
import { Router, NavigationStart, NavigationEnd } from "@angular/router";
import { UserService } from "src/app/services/user.service";

@Component({
  selector: "main-navbar",
  templateUrl: "./main-navbar.component.html",
  styleUrls: ["./main-navbar.component.css"],
})
export class MainNavbarComponent implements OnInit {
  constructor(private router: Router, private userService: UserService) {}
  activeLink: string;
  links = [
    {
      viewValue: "Home",
      route: "/account/home",
    },
    {
      viewValue: "Hours",
      route: "/account/fill",
    },
    {
      viewValue: "Applications",
      route: "/account/applications",
    },
    {
      viewValue: "TA Applications",
      route: "/account/ta-applications/view"
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
  }

  signOut() {
    this.router.navigate(["/login"]);
    this.userService.signout();
  }
}
