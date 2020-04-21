import { CustomCourseService } from "./../../../services/course.service";
import { UserService } from "../../../services/user.service";
import { ApplicationService } from "../../../services/application.service";
import { CourseService } from "../../../services/course.service";
import { MatTableDataSource } from "@angular/material/table";
import { Application } from "src/app/models/application";
import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { Observable } from "rxjs";
import { Course } from "src/app/models/course";
import * as _ from "lodash";

@Component({
  selector: "professor-retrieve-applications",
  templateUrl: "./professor-retrieve-applications.component.html",
  styleUrls: ["./professor-retrieve-applications.component.css"],
})
export class ProfessorRetrieveApplicationsComponent implements OnInit {
  constructor(
    private courseService: CourseService,
    private userService: UserService,
    private applicationService: ApplicationService,
    private customCourseService: CustomCourseService
  ) {}

  courses$: Observable<Course[]>;
  applications$: Observable<Application[]>;
  applications: Application[] = [];
  coursesTitleArray: string[] = [];
  firstName: string;
  lastName: string;
  professor: string;
  taStatus: string;
  @Input("applicationsForCourse") applicationsForCourses: Application[] = [];

  // @Output("viewDetails") viewDetails = new EventEmitter();
  @Output("assignStatus") assignStatus = new EventEmitter();

  displayedColumns: string[] = [
    "firstName",
    "lastName",
    "level",
    "courseNumber",
    "currentGpa",
    "gpaInSubject",
    "lookingForCoop",
    "notes",
    "status",
    "actions",
  ];
  dataSource: MatTableDataSource<Application>;

  ngOnInit(): void {
    this.taStatus = "Applied";
    this.courses$ = this.courseService.courses$;
    this.courseService.getAllCourses().subscribe();
    this.firstName = JSON.parse(this.userService.getUserData()).firstName;

    this.lastName = JSON.parse(this.userService.getUserData()).lastName;

    this.professor = this.lastName + ". " + this.firstName.charAt(0) + ".";

    this.courses$.subscribe((courses) => {
      if (courses) {
        this.coursesTitleArray = _.uniq(
          courses
            .filter((course) => course.Instructors === this.professor)
            .map((course) => course.Title)
        );
      }
      this.applicationService.getAllApplications().then((applications) => {
        this.applications = applications;
        // tslint:disable-next-line:prefer-for-of
        for (let i = 0; i < this.coursesTitleArray.length; i++) {
          // tslint:disable-next-line:prefer-for-of
          for (let j = 0; j < this.applications.length; j++) {
            if (
              this.coursesTitleArray[i] === this.applications[j].courseNumber
            ) {
              this.applicationsForCourses.push(this.applications[j]);
            }
          }
        }
        console.log("apps", this.applicationsForCourses);
        this.dataSource = new MatTableDataSource(this.applicationsForCourses);
      });
    });
  }

  // onCourseRowClicked(CRN: string) {
  //   this.viewDetails.emit({ CRN });
  // }

  assignStatusToTA(event: any, application: Application) {
    application.status = this.taStatus;
    // this.applications$ = this.applicationService.applications$;
    this.assignStatus.emit({
      application,
    });

    this.applicationService
      .updateApplicationForStudent(application)
      .subscribe();

    event.stopPropagation();
  }
}
