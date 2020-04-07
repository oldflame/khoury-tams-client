import { Injectable } from "@angular/core";
import {
  CanActivate,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
  Router,
  UrlTree
} from "@angular/router";
import { UserService } from './user.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: "root"
})
export class AuthGuardService implements CanActivate {
  constructor(private userService: UserService, private router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {
    console.log("In auth guard", this.userService.isAuthenticated());
    if (!this.userService.isAuthenticated()) {
      this.router.navigate(["/login"]);
      return false;
    }
    return true;
  }
}
