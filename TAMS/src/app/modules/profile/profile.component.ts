import {Component, OnInit} from '@angular/core';
import {UserService} from "../../services/user.service";
import {Router} from '@angular/router';

@Component({
  selector: 'profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(private userService: UserService, private router: Router) {
  }

  loggedInUser: any;
  editing: boolean = false;

  ngOnInit(): void {
    this.loggedInUser = JSON.parse(this.userService.getUserData());
    console.log(this.loggedInUser);
  }

  clicked() {
    if (!this.editing) {
      this.editing = true;
      // this.router.navigate([`/profile/${this.loggedInUser._id}`]);
    } else {
      this.editing = false;
      // this.router.navigate(["/profile"]);
      console.log(this.loggedInUser)
      // this.userService.updateUserById(this.loggedInUser);
      fetch(`http://localhost:7000/profile/${this.loggedInUser._id}`, {
        method: 'PUT',
        body: JSON.stringify(this.loggedInUser),
        headers: {
          'content-type': 'application/json'
        }
      }).then(response => response.json())
        .then(status => console.log(status));
    }
  }

}
