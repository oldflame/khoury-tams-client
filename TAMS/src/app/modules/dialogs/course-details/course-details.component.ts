import {Component, OnInit, Inject, AfterViewInit} from "@angular/core";
import {MatDialogRef, MAT_DIALOG_DATA} from "@angular/material/dialog";
import {CoursesListComponent} from "../../lists/courses-list/courses-list.component";
import {CourseService, CustomCourseService} from "src/app/services/course.service";
import {Observable} from "rxjs";
import {Course} from "src/app/models/course";

@Component({
  selector: "course-details",
  templateUrl: "./course-details.component.html",
  styleUrls: ["./course-details.component.css"]
})
export class CourseDetailsComponent implements AfterViewInit {
  CRN: string;
  courseDetails: Course;
  constructor(
    private dialogRef: MatDialogRef<CourseDetailsComponent>,
    private coursesService: CourseService,
    @Inject(MAT_DIALOG_DATA) private dialogData: any
  ) {
  }

  ngAfterViewInit() {
    this.CRN = this.dialogData.CRN;
    this.coursesService.courseDetails$.subscribe((course: Course) => {
      console.log("in details", course);
      this.courseDetails = course;
    });
    this.coursesService.getCourseDetails(this.CRN).subscribe();
  }
}
