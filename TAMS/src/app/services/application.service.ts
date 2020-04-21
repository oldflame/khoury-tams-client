import { Injectable } from "@angular/core";
import { DataService } from "./data.service";
import { BehaviorSubject, Observable, of } from "rxjs";
import { catchError, map } from "rxjs/operators";
import { HttpErrorResponse, HttpResponse } from "@angular/common/http";
import { Application } from "../models/application";
import * as _ from "lodash";

@Injectable()
export class ApplicationService {
  constructor(private dataService: DataService) {}
  private applicationSubject = new BehaviorSubject(null);
  applications$: Observable<Application[]> = this.applicationSubject.asObservable();

  getAllApplications = () =>
    fetch(`https://khoury-tams.herokuapp.com/applications`)
      .then(response => response.json())


  sendApplication(application: any) {
    return this.dataService.sendPOST("/submitApplication", application).pipe(
      map((res: HttpResponse<any>) => {
        if (res.status === 200) {
          const applications = this.applicationSubject.value || [];
          applications.push(res.body);
          this.applicationSubject.next(_.cloneDeep(applications));
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

  updateApplicationForStudent(application: any) {
    return this.dataService.sendPUT("/updateApplication", {application}).pipe(
      map((res: HttpResponse<any>) => {
        if (res.status === 200) {
          const applications = this.applicationSubject.value;
          const applicationIndexToUpdate = _.findIndex(applications, {
            _id: application._id,
          });
          if (applicationIndexToUpdate != -1) {
            applications.splice(applicationIndexToUpdate, 1, application);
          }
          this.applicationSubject.next(_.cloneDeep(applications));
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

  // getApplicationsForStudent(studentId: string) {
    // return this.dataService.sendGET(`/getSubmittedApplication/${studentId}`).pipe(
//   updateApplicationForStudent(application: any) {
//     return this.dataService.sendPUT("/updateApplication", {application}).pipe(
//       map((res: HttpResponse<any>) => {
//         if (res.status === 200) {
//           const applications = this.applicationSubject.value;
//           const applicationIndexToUpdate = _.findIndex(applications, {
//             _id: application._id,
//           });
//           if (applicationIndexToUpdate != -1) {
//             applications.splice(applicationIndexToUpdate, 1, application);
//           }
//           this.applicationSubject.next(_.cloneDeep(applications));
//           return true;
//         } else {
//           return false;
//         }
//       }),
//       catchError((err: HttpErrorResponse) => {
//         console.log(err);
//         return of(false);
//       })
//     );
//   }

  // updateApplication(application: Application): Observable<boolean> {
  //   return this.dataService.sendPUT(`/updateApplication`, application).pipe(
  //     map((res: HttpResponse<any>) => {
  //       if (res.status === 200) {
  //         const applications = this.applicationSubject.value;
  //         const applicationIndexToUpdate = _.findIndex(applications, {_id: application._id});
  //         applications.splice(applicationIndexToUpdate, 1, application);
  //         this.applicationSubject.next(_.cloneDeep(applications));
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

  getApplicationsForStudent(studentId: string) {
    return this.dataService
      .sendGET(`/getSubmittedApplication/${studentId}`)
      .pipe(
        map((res: HttpResponse<any>) => {
          if (res.status === 200) {
            this.applicationSubject.next(res.body);
            return true;
          } else {
            this.applicationSubject.next([]);
            return false;
          }
        }),
        catchError((err: HttpErrorResponse) => {
          console.log(err);
          this.applicationSubject.next([]);
          return of(false);
        })
      );
  }
}
