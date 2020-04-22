import { Course } from 'src/app/models/course';
import { MatTableDataSource } from '@angular/material/table';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Application } from 'src/app/models/application';
import { CourseService } from 'src/app/services/course.service';
import { UserService } from 'src/app/services/user.service';
import { ApplicationService } from 'src/app/services/application.service';
import { Observable } from 'rxjs';
import * as _ from "lodash";

@Component({
  selector: 'ta-accept-position',
  templateUrl: './ta-accept-position.component.html',
  styleUrls: ['./ta-accept-position.component.css']
})
export class TaAcceptPositionComponent implements OnInit {
  constructor(
    private courseService: CourseService,
    private userService: UserService,
    private applicationService: ApplicationService
  ) {}

  courses$: Observable<Course[]>;
  applications$: Observable<Application[]>;
  applications: Application[] = [];
  selectedApplicationsForStudent: Application[] = [];
  coursesArray: Course[] = [];
  courseTitleArray: string[] =[];
  studentId: string;
  acceptedSubject: string;
  professor: string;
  taStatus: string;
  @Input("applicationsForCourse") applicationsForCourses: Application[] = [];

  @Output("assignStatus") assignStatus = new EventEmitter();

  displayedColumns: string[] = [
    "courseNumber",
    "profTakingCourse",
    "status",
    "actions",
  ];
  dataSource: MatTableDataSource<Application>;

  ngOnInit(): void {
    this.taStatus = "Selected";
    this.acceptedSubject = '';
    this.courses$ = this.courseService.courses$;
    this.courseService.getAllCourses().subscribe();
    
    this.studentId = JSON.parse(this.userService.getUserData())._id;
    this.applications$ = this.applicationService.applications$;
    this.applicationService.getApplicationsForStudent(this.studentId).subscribe();

    
      this.applications$.subscribe((applications) => {
        if(applications) {
          this.selectedApplicationsForStudent = _.uniq(applications.filter((application) => application.status === 'Selected' || application.status === 'Accept'));
        }

        this.courses$.subscribe((courses) => {
          if (courses) {
            // this.coursesArray = _.uniq(courses.)

            this.coursesArray = courses;

            // this.courseTitleArray = _.uniq(
            //   courses
            //     .filter((course) => {
            //       let arr =  this.selectedApplicationsForStudent.map(app => app.courseNumber)
            //       return arr.includes(course.Course)
                  
            //     }))
            }

            
            for (let i = 0; i < this.selectedApplicationsForStudent.length; i++) {
              if(this.selectedApplicationsForStudent[i].status === 'Accept') {
                this.acceptedSubject = this.selectedApplicationsForStudent[i].courseNumber;
                this.selectedApplicationsForStudent = [];
                break;
              }
              this.professor = '';
              for (let j = 0; j < this.coursesArray.length; j++) {
                if (this.selectedApplicationsForStudent[i].courseNumber === this.coursesArray[j].Title && this.professor.search(this.coursesArray[j].Instructors) == -1) {
                  this.professor += " "  + this.coursesArray[j].Instructors;
                  // this.applicationsForCourses.push(this.applications[j]);
                }
              }
              this.selectedApplicationsForStudent[i].profTakingCourse = this.professor;
            }

            
            console.log("apps", this.selectedApplicationsForStudent);
            this.dataSource = new MatTableDataSource(this.selectedApplicationsForStudent);
        });
      });
  }

  acceptOrReject(event: any, application: Application) {
    application.status = this.taStatus;
    this.assignStatus.emit({
      application,
    });

    this.applicationService
      .updateApplicationForStudent(application)
      .subscribe();

    event.stopPropagation();
  }


}
