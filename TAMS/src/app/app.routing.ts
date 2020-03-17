import { AuthLayoutComponent } from "./layout/auth-layout/auth-layout.component";
import { Routes } from "@angular/router";
import { AuthModule } from './modules/auth/auth.module';

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
        loadChildren: () => AuthModule
      }
    ]
  }
];
