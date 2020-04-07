import { Injectable } from "@angular/core";
import {
  HttpClient,
  HttpResponse,
  HttpErrorResponse
} from "@angular/common/http";
import { DataService } from "./data.service";
import { User } from "../models/user";
import { map, catchError } from "rxjs/operators";
import { of, BehaviorSubject, Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class UserService {
  constructor(private http: HttpClient, private dataService: DataService) {}

  private userSubject = new BehaviorSubject(null);
  user$: Observable<User> = this.userSubject.asObservable();

  registerUser(user: User) {
    return this.dataService.sendPOST(`/register`, user).pipe(
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

  loginUser(user: User) {
    return this.dataService.sendPOST(`/login`, user).pipe(
      map((res: HttpResponse<any>) => {
        if (res.status === 200) {
          this.userSubject.next(res.body);
          localStorage.setItem("user", JSON.stringify(res.body));
          localStorage.setItem("token", res.body.authToken);
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
