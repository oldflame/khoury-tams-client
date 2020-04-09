import { Injectable } from "@angular/core";
import { DataService } from "./data.service";
import { TaHours } from "../models/ta-hours";
import { HttpResponse, HttpErrorResponse } from "@angular/common/http";
import { map, catchError } from "rxjs/operators";
import { of, BehaviorSubject, Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class FillHoursService {
  constructor(private dataService: DataService) {}
  private hours = new BehaviorSubject(null);
  allHours$: Observable<any> = this.hours.asObservable();

  sendWeeklyHours(taHours: TaHours) {
    return this.dataService.sendPOST(`/submitHours`, taHours).pipe(
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


  getAllHoursData(taId: string) {
    return this.dataService.sendGET(`/getHours/${taId}`).pipe(
      map((res: HttpResponse<object>) => {
        if (res.status === 200) {
          this.hours.next(res.body);
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

