import { Component, OnInit } from "@angular/core";
import { CourseService } from "src/app/services/course.service";
import { Course } from "src/app/models/course";
import { Observable, EMPTY } from "rxjs";
import { MatTabChangeEvent } from "@angular/material/tabs";
import { MatDialog } from "@angular/material/dialog";
import { CourseDetailsComponent } from "../dialogs/course-details/course-details.component";
import { FormControl } from "@angular/forms";
import { SelectProfessorComponent } from "../dialogs/select-professor/select-professor.component";
import { Professor } from "src/app/models/professor";
import { switchMap } from "rxjs/operators";

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
    this.dialogRef = this.dialog.open(SelectProfessorComponent, {
      width: "500px",
      closeOnNavigation: true,
    });

    this.dialogRef
      .afterClosed()
      .pipe(
        switchMap((professor: Professor) => {
          if (professor) {
            console.log("Selected prof: ", professor);
            eventArgs.course.Instructors = professor.Instructors;
            return this.courseService.updateCourse(eventArgs);
          }
          return EMPTY;
        })
      )
      .subscribe();
  }
}
