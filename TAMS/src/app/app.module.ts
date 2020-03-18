import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AuthLayoutComponent } from "./layout/auth-layout/auth-layout.component";
import { AdminLayoutComponent } from "./layout/admin-layout/admin-layout.component";
import { RouterModule } from "@angular/router";
import { AppRoutes } from "./app.routing";
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { InterceptorService } from './services/interceptor.service';

@NgModule({
  declarations: [AppComponent, AuthLayoutComponent, AdminLayoutComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(AppRoutes),
    HttpClientModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: InterceptorService,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule {}
