import { Component, OnInit } from "@angular/core";
import { CourseService } from "src/app/services/course.service";
import { Course } from "src/app/models/course";
import { Observable } from "rxjs";
import { MatTabChangeEvent } from "@angular/material/tabs";
import { MatDialog } from "@angular/material/dialog";
import { CourseDetailsComponent } from "../dialogs/course-details/course-details.component";
import { FormControl } from "@angular/forms";

@Component({
  selector: "home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
})
export class HomeComponent implements OnInit {
  courses$: Observable<Course[]>;
  dialogRef;

  constructor(
    private courseService: CourseService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.courses$ = this.courseService.courses$;
    this.getCoursesByStream("1");
  }

  getCoursesByStream(stream: string) {
    this.courseService.getCourseByStream(stream).subscribe();
  }

  tabChanged(eventArgs: MatTabChangeEvent) {
    this.getCoursesByStream(eventArgs.index + 1 + "");
  }

  showCourseDetails(eventArgs: any) {
    console.log("Viewing Details", eventArgs);
    this.dialogRef = this.dialog.open(CourseDetailsComponent, {
      width: "600px",
      closeOnNavigation: true,
      data: {
        CRN: eventArgs.CRN,
      },
    });
  }

  assignProfessor(eventArgs) {
    console.log(eventArgs);

  }
}
