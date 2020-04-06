import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { UserService } from "src/app/services/user.service";
import { Router } from "@angular/router";

@Component({
  selector: "register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.css"]
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup = new FormGroup({
    email: new FormControl("", [Validators.required, Validators.email]),
    password: new FormControl("", [
      Validators.required,
      Validators.minLength(8)
    ]),
    firstName: new FormControl("", [Validators.required]),
    lastName: new FormControl("", [Validators.required]),
    phoneNumber: new FormControl("", [
      Validators.required,
      Validators.maxLength(10)
    ]),
    role: new FormControl("", [Validators.required])
  });

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {}

  onRegister() {
    this.userService
      .registerUser(this.registerForm.value)
      .subscribe((response: boolean) => {
        if (response) {
          this.router.navigate(["/login"]);
        }
      });
  }
}
