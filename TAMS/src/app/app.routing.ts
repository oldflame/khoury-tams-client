import {AuthLayoutComponent} from "./layout/auth-layout/auth-layout.component";
import {Routes} from "@angular/router";
import {AuthModule} from './modules/auth/auth.module';
import {HomeModule} from './modules/home/home.module';
import {AdminLayoutComponent} from './layout/admin-layout/admin-layout.component';
import {ApplicationsComponent} from "./applications/applications.component";

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
        loadChildren: () => HomeModule
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
