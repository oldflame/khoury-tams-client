import {Injectable} from "@angular/core";
import {DataService} from "./data.service";
import {BehaviorSubject, Observable, of} from "rxjs";
import {catchError, map} from "rxjs/operators";
import {HttpErrorResponse, HttpResponse} from "@angular/common/http";

@Injectable()
export class ApplicationService {

  constructor(private dataService: DataService) {
  }

  getAllApplications = () =>
    fetch(`localhost:7000/applications`)
      .then(response => response.json())

  sendApplication(Application: any) {
    return this.dataService.sendPOST('/submitApplication', Application).pipe(
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
