import {BrowserModule} from "@angular/platform-browser";
import {NgModule} from "@angular/core";

import {AppComponent} from "./app.component";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {AuthLayoutComponent} from "./layout/auth-layout/auth-layout.component";
import {AdminLayoutComponent} from "./layout/admin-layout/admin-layout.component";
import {RouterModule} from "@angular/router";
import {AppRoutes} from "./app.routing";
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import {InterceptorService} from './services/interceptor.service';
import {SharedModule} from './modules/shared/shared.module';
import {ApplicationsComponent} from './applications/applications.component';
import {TaAcceptPositionComponent} from './ta-accept-position/ta-accept-position.component';
import {TaApplyPositionComponent} from './ta-apply-position/ta-apply-position.component';
import {MatCardModule} from "@angular/material/card";
import {CustomCourseService} from "./services/course.service";

@NgModule({
  declarations: [AppComponent, AuthLayoutComponent, AdminLayoutComponent,
    ApplicationsComponent, TaAcceptPositionComponent, TaApplyPositionComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(AppRoutes),
    HttpClientModule,
    SharedModule,
    MatCardModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: InterceptorService,
    multi: true},
    CustomCourseService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
