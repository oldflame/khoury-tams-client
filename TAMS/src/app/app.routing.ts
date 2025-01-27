import { AuthLayoutComponent } from "./layout/auth-layout/auth-layout.component";
import { Routes } from "@angular/router";
import { AuthModule } from "./modules/auth/auth.module";
import { HomeModule } from "./modules/home/home.module";
import { AdminLayoutComponent } from "./layout/admin-layout/admin-layout.component";

import { AuthGuardService } from "./services/auth-guard.service";
import { ApplicationModule } from "./modules/application/application.module";
import { HoursModule } from "./modules/hours/hours.module";
import { HoursGuardService } from "./services/hours-guard.service";
import { UsersModule } from "./modules/users/users.module";
import { ProfileModule } from "./modules/profile/profile.module";
import { CourseReviewModule } from './modules/course-review/course-review.module';
import { FeedModule } from './modules/feed/feed.module';

export const AppRoutes: Routes = [
  {
    path: "",
    redirectTo: "account/home",
    pathMatch: "full",
  },
  {
    path: "account",
    component: AdminLayoutComponent,
    children: [
      {
        path: "feed",
        loadChildren: () => FeedModule,
        canActivate: [AuthGuardService],
      },
      {
        path: "home",
        loadChildren: () => HomeModule,
        canActivate: [],
      },
      {
        path: "fill",
        loadChildren: () => HoursModule,
        canActivate: [AuthGuardService, HoursGuardService],
      },
      {
        path: "applications",
        loadChildren: () => ApplicationModule,
        canActivate: [AuthGuardService]
      },
      {
        path: "ta-applications",
        loadChildren: () => ApplicationModule,
        canActivate: [AuthGuardService]
      },
      {
        path: "ta-acceptance",
        loadChildren: () => ApplicationModule,
        canActivate: [AuthGuardService] 
      },
      {
        path: "follow-users",
        loadChildren: () => UsersModule,
        canActivate: [AuthGuardService],
      },
      {
        path: "profile",
        loadChildren: () => ProfileModule,
        canActivate: [AuthGuardService],
      },
      {
        path: "course",
        loadChildren: () => CourseReviewModule,
        canActivate: [AuthGuardService],
      }
    ],
  },
  {
    path: "",
    component: AuthLayoutComponent,
    children: [
      {
        path: "",
        loadChildren: () => AuthModule,
      },
    ],
  },

  {
    path: "application",
    children: [
      {
        path: "",
        loadChildren: () => ApplicationModule,
      },
    ],
  },

  // {
  //   path: "profile",
  //   component: ProfileComponent
  // },
  // {
  //   path: "profile/:profileId",
  //   component: ProfileComponent
  // },
  // {
  //   path: "course/:courseId/reviews",
  //   component: CourseReviewComponent
  // }
];
