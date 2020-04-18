import { Component, OnInit } from "@angular/core";
import { FormControl, Validators, FormGroup } from "@angular/forms";
import { CourseService } from "src/app/services/course.service";

@Component({
  selector: "add-course",
  templateUrl: "./add-course.component.html",
  styleUrls: ["./add-course.component.css"],
})
export class AddCourseComponent implements OnInit {
  constructor(private courseService: CourseService) {}

  course;
  addCourseControl: FormGroup = new FormGroup({
    Title: new FormControl("", [Validators.required]),
    Course: new FormControl("", [Validators.required]),
    CRN: new FormControl("", [Validators.required]),
    Instructors: new FormControl("", [Validators.required]),
    Room: new FormControl("", [Validators.required]),
    Size: new FormControl("", [Validators.required]),
    Capacity: new FormControl("", [Validators.required]),
    Enrollment: new FormControl("", [Validators.required]),
    Waitlist: new FormControl("", [Validators.required]),
  });
  ngOnInit(): void {}
}
