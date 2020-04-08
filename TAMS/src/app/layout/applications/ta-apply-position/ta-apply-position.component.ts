import {Component, OnInit} from '@angular/core';
import {CustomCourseService} from "../../../services/course.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../../services/user.service";

@Component({
  selector: 'ta-apply-position',
  templateUrl: './ta-apply-position.component.html',
  styleUrls: ['./ta-apply-position.component.css']
})
export class TaApplyPositionComponent implements OnInit {
  applicationForm: FormGroup = new FormGroup({
    level: new FormControl("", [Validators.required]),
    gpaInSubject: new FormControl(""),
    currentGpa: new FormControl(""),
    lookingForCoop: new FormControl("", [Validators.required]),
    notes: new FormControl(""),
    courseNumber: new FormControl("", [Validators.required])
  });

  constructor(private service: CustomCourseService,
              private userService: UserService) {
  }

  courses: [];
  firstName: string;
  lastName: string;
  email: string;

  ngOnInit() {
    this.service
      .getAllCourses()
      .then(courses => this.courses = courses);
    this.firstName = JSON.parse(this.userService.getUserData()).firstName;
    this.lastName = JSON.parse(this.userService.getUserData()).lastName;
    this.email = JSON.parse(this.userService.getUserData()).email;
  }

}
