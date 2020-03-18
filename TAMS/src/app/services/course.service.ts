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

  constructor(private dataService: DataService) {}

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
}