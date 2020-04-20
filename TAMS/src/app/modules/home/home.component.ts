import { Component, OnInit } from "@angular/core";
import { CourseService } from "src/app/services/course.service";
import { Course } from "src/app/models/course";
import { Observable, EMPTY, pipe } from "rxjs";
import { MatTabChangeEvent } from "@angular/material/tabs";
import { MatDialog } from "@angular/material/dialog";
import { CourseDetailsComponent } from "../dialogs/course-details/course-details.component";
import { FormControl } from "@angular/forms";
import { SelectProfessorComponent } from "../dialogs/select-professor/select-professor.component";
import { Professor } from "src/app/models/professor";
import { switchMap } from "rxjs/operators";
import { AddCourseComponent } from "../dialogs/add-course/add-course.component";
import { SecureStorageService } from "src/app/services/secure-storage.service";
import { User } from "src/app/models/user";

@Component({
  selector: "home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
})
export class HomeComponent implements OnInit {
  courses$: Observable<Course[]>;
  dialogRef;
  selectedTab: number;
  currentUser: User;
  constructor(
    private secureStorageService: SecureStorageService,
    private courseService: CourseService,
    private dialog: MatDialog
  ) {
    this.currentUser = JSON.parse(this.secureStorageService.getValue("user"));
  }

  ngOnInit(): void {
    this.courses$ = this.courseService.courses$;
    this.getCoursesByStream("1");
  }

  getCoursesByStream(stream: string) {
    this.courseService.getCourseByStream(stream).subscribe();
  }

  tabChanged(eventArgs: MatTabChangeEvent) {
    this.selectedTab = eventArgs.index + 1;
    console.log("STREAM", this.selectedTab);
    this.getCoursesByStream(this.selectedTab + "");
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
            eventArgs.course.Instructors = professor.Instructors;
            return this.courseService.updateCourse(eventArgs);
          }
          return EMPTY;
        })
      )
      .subscribe();
  }

  showAddCourseDialog() {
    this.dialogRef = this.dialog.open(AddCourseComponent, {
      width: "800px",
      closeOnNavigation: true,
    });

    this.dialogRef
      .afterClosed()
      .pipe(
        switchMap((res: Course) => {
          if (res) {
            res.stream = this.selectedTab + "";
            console.log(res);
            return this.courseService.addCourse(res);
          }
          return EMPTY;
        })
      )
      .subscribe();
  }
}
