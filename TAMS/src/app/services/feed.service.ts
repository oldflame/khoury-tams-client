import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, of } from "rxjs";
import { Feed } from "../models/feed";
import { DataService } from "./data.service";
import { HttpResponse, HttpErrorResponse } from "@angular/common/http";
import { catchError, map } from "rxjs/operators";
import * as _ from "lodash";

@Injectable({
  providedIn: "root",
})
export class FeedService {
  private feedSubject = new BehaviorSubject(null);
  feed$: Observable<Feed[]> = this.feedSubject.asObservable();

  constructor(private dataService: DataService) {}

  getFeed(userId: string): Observable<boolean> {
    return this.dataService.sendGET(`/feed/${userId}`).pipe(
      map(
        (res: HttpResponse<any>) => {
          if (res.status == 200) {
            this.feedSubject.next(res.body);
          }
          this.feedSubject.next([]);
          return res.status == 200;
        },
        catchError((err: HttpErrorResponse) => {
          console.log("GEt feed err", err);
          this.feedSubject.next([]);
          return of(false);
        })
      )
    );
  }

  submitPost(post: Feed): Observable<boolean> {
    return this.dataService.sendPOST("/feed", { post }).pipe(
      map(
        (res: HttpResponse<any>) => {
          if (res.status == 200) {
            const feed = this.feedSubject.value || [];
            feed.push(res.body);
            this.feedSubject.next(_.cloneDeep(res.body));
          }
          return res.status == 200;
        },
        catchError((err: HttpErrorResponse) => {
          console.log("Submit post err", err);
          return of(false);
        })
      )
    );
  }
}
