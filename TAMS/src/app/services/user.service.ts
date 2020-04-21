import {Injectable} from "@angular/core";
import {
  HttpClient,
  HttpResponse,
  HttpErrorResponse,
} from "@angular/common/http";
import {DataService} from "./data.service";
import {User} from "../models/user";
import {map, catchError} from "rxjs/operators";
import {of, BehaviorSubject, Observable} from "rxjs";
import {SecureStorageService} from "./secure-storage.service";

@Injectable({
  providedIn: "root",
})
export class UserService {
  constructor(
    private http: HttpClient,
    private dataService: DataService,
    private secureStorageService: SecureStorageService
  ) {
  }

  private userSubject = new BehaviorSubject(null);
  user$: Observable<User> = this.userSubject.asObservable();

  private usersSubject = new BehaviorSubject(null);
  users$: Observable<User[]> = this.userSubject.asObservable();

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
          this.secureStorageService.setValue("user", JSON.stringify(res.body));
          this.secureStorageService.setValue("token", res.body.authToken);
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

  getAllUsers(): Observable<boolean> {
    return this.dataService.sendGET(`/users`).pipe(
      map((res: HttpResponse<object>) => {
        if (res.status === 200) {
          this.userSubject.next(res.body);
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

  signout() {
    this.userSubject.next(null);
    this.secureStorageService.clearStorage();
  }

  isAuthenticated(): boolean {
    console.log("is auth", this.secureStorageService.getValue("token"));
    return this.secureStorageService.getValue("token") !== "";
  }

  getUserData() {
    const user = this.secureStorageService.getValue("user");
    return user;
  }

  findUserById(userId: string) {
    return this.dataService.sendGET(`/users/${userId}`).pipe(
      map((res: HttpResponse<object>) => {
        if (res.status == 200) {
          return (res.body);
        } else {
          return null;
        }
      }),
      catchError((err: HttpErrorResponse) => {
        console.log(err);
        return of(null);
      })
    );
  }

  followUser(currentUser: User, followedUser: User) {
    const reqBody = { currentUser, followedUser };
    return this.dataService.sendPUT(`/followUser`, reqBody).pipe(
      map((res: HttpResponse<object>) => {
        if (res.status === 200) {
          this.secureStorageService.removeKey("user");
          this.secureStorageService.setValue("user", JSON.stringify(currentUser));
          console.log("Post local update", this.getUserData().following);
          this.getAllUsers().subscribe();
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

  unFollowUser(currentUser: User, followedUser: User) {
    const reqBody = { currentUser, followedUser };
    return this.dataService.sendPUT(`/unFollowUser`, reqBody).pipe(
      map((res: HttpResponse<object>) => {
        if (res.status === 200) {
          this.secureStorageService.removeKey("user");
          this.secureStorageService.setValue("user", JSON.stringify(currentUser));
          this.getAllUsers().subscribe();
        }
        return res.status == 200;
      }),
      catchError((err: HttpErrorResponse) => {
        console.log(err);
        return of(false);
      })
    );
  }
}
