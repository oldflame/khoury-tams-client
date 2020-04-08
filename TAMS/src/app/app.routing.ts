import { AuthLayoutComponent } from "./layout/auth-layout/auth-layout.component";
import { Routes } from "@angular/router";
import { AuthModule } from './modules/auth/auth.module';
import { HomeModule } from './modules/home/home.module';
import { AdminLayoutComponent } from './layout/admin-layout/admin-layout.component';
import { AssignCourseComponent } from './assign-course/assign-course.component';
import { AuthGuardService } from './services/auth-guard.service';

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
    path: "assignCourse",
    component: AssignCourseComponent
  }
];
