import { Component, OnInit } from "@angular/core";
import { Router, NavigationStart, NavigationEnd } from "@angular/router";

@Component({
  selector: "main-navbar",
  templateUrl: "./main-navbar.component.html",
  styleUrls: ["./main-navbar.component.css"],
})
export class MainNavbarComponent implements OnInit {
  constructor(private router: Router) {}
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
}
