import { Component, OnInit } from "@angular/core";
import { CourseService } from "../../../services/course.service";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { UserService } from "../../../services/user.service";
import { ApplicationService } from "../../../services/application.service";
import { Observable } from "rxjs";
import { Course } from "src/app/models/course";
import { map } from "rxjs/operators";
import { Application } from "src/app/models/application";
import * as _ from "lodash";

@Component({
  selector: "ta-apply-position",
  templateUrl: "./ta-apply-position.component.html",
  styleUrls: ["./ta-apply-position.component.css"],
})
export class TaApplyPositionComponent implements OnInit {
  applicationForm: FormGroup = new FormGroup({
    level: new FormControl("", [Validators.required]),
    gpaInSubject: new FormControl("", [Validators.min(1), Validators.max(4)]),
    currentGpa: new FormControl("", [Validators.min(1), Validators.max(4)]),
    lookingForCoop: new FormControl("", [Validators.required]),
    notes: new FormControl(""),
    courseNumber: new FormControl("", [Validators.required]),
    status: new FormControl(""),
  });

  constructor(
    private courseService: CourseService,
    private userService: UserService,
    private applicationService: ApplicationService
  ) {}
  courses$: Observable<Course[]>;
  firstName: string;
  lastName: string;
  email: string;
  lookingForCoop: false;
  coursesTitleArray: string[];
  applicationForms: FormGroup[] = [];
  status: string;

  ngOnInit() {
    this.courses$ = this.courseService.courses$;
    this.courseService.getAllCourses().subscribe();
    this.courses$.subscribe((courses) => {
      if (courses) {
        this.coursesTitleArray = _.uniq(courses.map((course) => course.Title));
      }
    });
    this.applicationService.applications$.subscribe(
      (applications: Application[]) => {
        if (applications && applications.length > 0) {
          this.applicationForms = applications.map((application: Application) =>
            this.getApplicationForm(application)
          );
        }
      }
    );
    this.applicationService
      .getApplicationsForStudent(JSON.parse(this.userService.getUserData())._id)
      .subscribe();
    this.addNewApplication();
  }

  submitApplication(applicationForm: FormGroup) {
    console.log("submitting app: ", applicationForm.value);
    let applicationData = _.cloneDeep(applicationForm.value);
    applicationData.firstName = JSON.parse(
      this.userService.getUserData()
    ).firstName;
    applicationData.lastName = JSON.parse(
      this.userService.getUserData()
    ).lastName;
    applicationData.email = JSON.parse(this.userService.getUserData()).email;
    applicationData.studentId = JSON.parse(this.userService.getUserData())._id;
    applicationData.status = "Applied";
    console.log(applicationData);
    if (applicationData._id) {
      console.log("Updating", applicationData._id);
      this.applicationService
        .updateApplicationForStudent(applicationData)
        .subscribe();
    } else {
      applicationData = _.omit(applicationData, "_id");
      this.applicationService.sendApplication(applicationData).subscribe();
    }
  }

  getApplicationForm(application?: Application): FormGroup {
    return new FormGroup({
      level: new FormControl(application?.level || "", [Validators.required]),
      _id: new FormControl(application?._id || null),
      gpaInSubject: new FormControl(application?.gpaInSubject || "", [
        Validators.min(1),
        Validators.max(4),
      ]),
      currentGpa: new FormControl(application?.currentGpa || "", [
        Validators.required,
        Validators.min(1),
        Validators.max(4),
      ]),
      lookingForCoop: new FormControl(application?.lookingForCoop || false, [
        Validators.required,
      ]),
      notes: new FormControl(application?.notes || ""),
      courseNumber: new FormControl(application?.courseNumber || "", [
        Validators.required,
      ]),
      status: new FormControl(""),
    });
  }

  deleteApplication(indexToDelete) {
    if (!this.applicationForms[indexToDelete].value._id) {
      this.applicationForms.splice(indexToDelete, 1);
    } else {
      this.applicationService.deleteApplication(
        this.applicationForms[indexToDelete].value._id
      ).subscribe();
    }
  }
  addNewApplication() {
    this.applicationForms.push(this.getApplicationForm());
  }
}
