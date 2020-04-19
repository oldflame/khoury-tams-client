import {AuthLayoutComponent} from "./layout/auth-layout/auth-layout.component";
import {Routes} from "@angular/router";
import {AuthModule} from './modules/auth/auth.module';
import {HomeModule} from './modules/home/home.module';
import {AdminLayoutComponent} from './layout/admin-layout/admin-layout.component';
import {AuthGuardService} from './services/auth-guard.service';
import {ApplicationModule} from './modules/application/application.module';
import {HoursModule} from './modules/hours/hours.module';
import {ProfileComponent} from "./modules/profile/profile.component";
import { CourseReviewComponent } from './modules/course-review/course-review.component';

export const AppRoutes: Routes = [
  {
    path: "",
    redirectTo: "login",
    pathMatch: "full"
  },
  {
    path: "account",
    component: AdminLayoutComponent,
    children: [
      {
        path: "home",
        loadChildren: () => HomeModule,
        canActivate: [AuthGuardService]
      },
      {
        path: "fill",
        loadChildren: () => HoursModule,
        canActivate: [AuthGuardService]
      },
      {
        path: "applications",
        loadChildren: () => ApplicationModule,
        canActivate: [AuthGuardService]
      }
    ]
  },
  {
    path: "",
    component: AuthLayoutComponent,
    children: [
      {
        path: "",
        loadChildren: () => AuthModule
      }
    ]
  },

  {
    path: "application",
    children: [
      {
        path: "",
        loadChildren: () => ApplicationModule
      }
    ]
  },
  {
    path: "profile",
    component: ProfileComponent
  },
  {
    path: "course/:courseId",
    component: CourseReviewComponent
  }

];
