import {Injectable} from "@angular/core";
import {DataService} from "./data.service";
import {BehaviorSubject, Observable, of} from "rxjs";
import {Course} from "../models/course";
import {map, catchError} from "rxjs/operators";
import {HttpErrorResponse, HttpResponse} from "@angular/common/http";
import {Professor} from "../models/professor";
import * as _ from 'lodash';


@Injectable({
  providedIn: "root",
})
export class CourseService {
  private subject = new BehaviorSubject(null);
  courses$: Observable<Course[]> = this.subject.asObservable();

  private professorSubject = new BehaviorSubject(null);
  professors$: Observable<Professor[]> = this.professorSubject.asObservable();

  private courseDetailsSubject = new BehaviorSubject(null);
  courseDetails$: Observable<Course> = this.courseDetailsSubject.asObservable();

  constructor(private dataService: DataService) {
  }

  getAllCourses(): Observable<boolean> {
    return this.dataService.sendGET(`/courses/`).pipe(
      map((res: HttpResponse<object>) => {
        if (res.status === 200) {
          this.subject.next(res.body);
          return true;
        } else {
          return false;
        }
      }),
      catchError((err: HttpErrorResponse) => {
        console.log(err);
        return of(false);
      })
    );
  }

  getCourseByStream(stream: string): Observable<boolean> {
    return this.dataService.sendGET(`/courses/${stream}`).pipe(
      map((res: HttpResponse<object>) => {
        if (res.status === 200) {
          this.subject.next(res.body);
          return true;
        } else {
          return false;
        }
      }),
      catchError((err: HttpErrorResponse) => {
        console.log(err);
        return of(false);
      })
    );
  }

  getCourseDetails(CRN: string): Observable<boolean> {
    return this.dataService.sendGET(`/courses/details/${CRN}`).pipe(
      map((res: HttpResponse<object>) => {
        if (res.status === 200) {
          this.courseDetailsSubject.next(res.body);
          return true;
        } else {
          return false;
        }
      }),
      catchError((err: HttpErrorResponse) => {
        console.log(err);
        return of(false);
      })
    );
  }

  getAllProfessors(): Observable<boolean> {
    return this.dataService.sendGET(`/instructors`).pipe(
      map((res: HttpResponse<object>) => {
        if (res.status === 200) {
          this.professorSubject.next(res.body);
          return true;
        } else {
          return false;
        }
      }),
      catchError((err: HttpErrorResponse) => {
        console.log(err);
        return of(false);
      })
    );
  }

  addCourse(course: Course): Observable<boolean> {
    return this.dataService.sendPOST(`/addCourse`, course).pipe(
      map((res: HttpResponse<any>) => {
        if (res.status === 200) {
          return true;
        } else {
          return false;
        }
      }),
      catchError((err: HttpErrorResponse) => {
        console.log(err);
        return of(false);
      })
    );
  }

  updateCourse(course: Course): Observable<boolean> {
    return this.dataService.sendPUT(`/updateCourse`, course).pipe(
      map((res: HttpResponse<any>) => {
        if (res.status === 200) {
          const courses = this.subject.value;
          const courseIndexToUpdate = _.findIndex(courses, {_id: course._id});
          courses.splice(courseIndexToUpdate, 1, course);
          this.subject.next(_.cloneDeep(courses));
          return true;
        } else {
          return false;
        }
      }),
      catchError((err: HttpErrorResponse) => {
        console.log(err);
        return of(false);
      })
    );
  }
}

@Injectable()
export class CustomCourseService {
  getAllCourses = () =>
    fetch(`http://localhost:7000/courses`)
      .then(response => response.json())

  getCourseById = (id) => 
    fetch(`http://localhost:7000/course/${id}`)
      .then(response => response.json())

  getCourseDetails = (CRN) =>
    fetch(`http://localhost:7000/courses/details/${CRN}`)
      .then(response => response.json())
}
