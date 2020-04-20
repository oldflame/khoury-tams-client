import { Injectable } from "@angular/core";
import {
  CanActivate,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
  Router,
  UrlTree,
} from "@angular/router";
import { UserService } from "./user.service";
import { Observable } from "rxjs";
import { SecureStorageService } from "./secure-storage.service";
import { User } from "../models/user";

@Injectable({
  providedIn: "root",
})
export class HoursGuardService implements CanActivate {
  currentUser: User;
  constructor(
    private userService: UserService,
    private router: Router,
    private secureStorageService: SecureStorageService
  ) {
    this.currentUser = JSON.parse(this.secureStorageService.getValue("user"));
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {
    console.log("In hours guard", this.userService.isAuthenticated());
    if (this.currentUser.role == "Faculty") {
      this.router.navigate(["/account/home"]);
      return false;
    }
    return true;
  }
}
