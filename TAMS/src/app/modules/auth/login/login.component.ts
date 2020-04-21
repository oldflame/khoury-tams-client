import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { UserService } from "src/app/services/user.service";
import { Router } from "@angular/router";

@Component({
  selector: "login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup = new FormGroup({
    email: new FormControl("", [Validators.required, Validators.email]),
    password: new FormControl("", [
      Validators.required,
      Validators.minLength(8)
    ])
  });

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {}

  onLogin() {
    this.userService
      .loginUser(this.loginForm.value)
      .subscribe((response: boolean) => {
        if (response) {
          this.router.navigate(["/account/feed"]);
        } else {
          alert("Invalid Credentials");
        }
      });
  }
}
