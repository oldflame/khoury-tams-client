import {Component, OnInit} from '@angular/core';
import {ProfileService, UserService} from "../../services/user.service";
import {Router} from '@angular/router';

@Component({
  selector: 'profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(private userService: UserService,
              private router: Router,
              private profileService: ProfileService) {
  }

  loggedInUser: any;
  editing = false;
  userId: '';

  ngOnInit(): void {
    this.userId = JSON.parse(this.userService.getUserData())._id;
    this.profileService
      .getUserById(this.userId)
      .then(user => {
        this.loggedInUser = user[0];
      });
  }

  clicked() {
    if (!this.editing) {
      this.editing = true;
      // this.router.navigate([`/profile/${this.loggedInUser._id}`]);
    } else {
      this.editing = false;
      // this.router.navigate(["/profile"]);
      fetch(`http://localhost:7000/profile/${this.loggedInUser._id}`, {
        method: 'PUT',
        body: JSON.stringify(this.loggedInUser),
        headers: {
          'content-type': 'application/json'
        }
      }).then(response => response.json())
        .then(updatedUser => this.loggedInUser = updatedUser);
    }
  }

}
