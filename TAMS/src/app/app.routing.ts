import {AuthLayoutComponent} from "./layout/auth-layout/auth-layout.component";
import {Routes} from "@angular/router";
import {AuthModule} from './modules/auth/auth.module';
import {HomeModule} from './modules/home/home.module';
import {AdminLayoutComponent} from './layout/admin-layout/admin-layout.component';
import {ApplicationsComponent} from "./layout/applications/applications.component";
import { AuthLayoutComponent } from "./layout/auth-layout/auth-layout.component";
import { Routes } from "@angular/router";
import { AuthModule } from './modules/auth/auth.module';
import { HomeModule } from './modules/home/home.module';
import { AdminLayoutComponent } from './layout/admin-layout/admin-layout.component';
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
    path: "application",
    component: ApplicationsComponent
  },
  {
    path: "application/apply",
    component: ApplicationsComponent
  },
  {
    path: "application/accept",
    component: ApplicationsComponent
  }
];
