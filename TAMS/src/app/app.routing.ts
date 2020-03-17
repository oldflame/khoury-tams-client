import { AuthLayoutComponent } from "./layout/auth-layout/auth-layout.component";
import { Routes } from "@angular/router";

export const AppRoutes: Routes = [
  {
    path: "",
    redirectTo: "login",
    pathMatch: "full"
  },
  {
    path: "",
    component: AuthLayoutComponent,
    children: [
      {
        path: "",
        loadChildren: "./modules/auth/auth.module#AuthModule"
      }
    ]
  }
];
