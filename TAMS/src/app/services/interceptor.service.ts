import { map, catchError } from "rxjs/operators";
import {
  throwError as observableThrowError,
  Observable,
} from "rxjs";
import { Injectable } from "@angular/core";
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent
} from "@angular/common/http";
import { environment } from "src/environments/environment";

@Injectable()
export class InterceptorService implements HttpInterceptor {
  constructor() {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    req = req.clone({
      url: environment.hostname + ":" + environment.port + req.url
    });
    console.log("INTERCEPTOR URL", req.url);
    return next.handle(req);
  }
}
