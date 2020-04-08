import { Injectable } from "@angular/core";
import { DataService } from "./data.service";
import { BehaviorSubject, Observable, of } from "rxjs";
import { Course } from "../models/course";
import { map, catchError } from "rxjs/operators";
import { HttpErrorResponse, HttpResponse } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class CourseService {
  private subject = new BehaviorSubject(null);
  courses$: Observable<Course[]> = this.subject.asObservable();

  private courseDetailsSubject = new BehaviorSubject(null);
  courseDetails$: Observable<Course> = this.courseDetailsSubject.asObservable();

  constructor(private dataService: DataService) { }

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


  getAllProfessors = () =>
    fetch(`http://localhost:7000/instructors`)
      .then(response => response.json())

  getAllCourseNames(): Observable<boolean> {
    return this.dataService.sendGET(`/courseNames`).pipe(
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

  getCourseById = (id: string) =>
    fetch(`http://localhost:7000/course/${id}`)
      .then(response => response.json())
  // {
  //   return this.dataService.sendGET(`/course/${id}`).pipe(
  //     map((res: HttpResponse<object>) => {
  //       if (res.status === 200) {
  //         this.subject.next(res.body);
  //         return true;
  //       } else {
  //         return false;
  //       }
  //     }),
  //     catchError((err: HttpErrorResponse) => {
  //       console.log(err);
  //       return of(false);
  //     })
  //   );
  // }


  updateCourse(course: Course) {
    return this.dataService.sendPUT(`/updateCourse`, course).pipe(
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
}
