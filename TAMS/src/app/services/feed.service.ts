import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, of } from "rxjs";
import { Feed } from "../models/feed";
import { DataService } from "./data.service";
import { HttpResponse, HttpErrorResponse } from "@angular/common/http";
import { catchError, map } from "rxjs/operators";
import * as _ from "lodash";
import { UserService } from './user.service';

@Injectable({
  providedIn: "root",
})
export class FeedService {
  private feedSubject = new BehaviorSubject(null);
  feed$: Observable<Feed[]> = this.feedSubject.asObservable();

  constructor(private dataService: DataService, private userService: UserService) {}

  getFeed(userId: string): Observable<boolean> {
    return this.dataService.sendGET(`/feed/${userId}`).pipe(
      map(
        (res: HttpResponse<any>) => {
          if (res.status == 200) {
            this.feedSubject.next(res.body);
          } else {
            this.feedSubject.next([]);
          }
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
            res.body.postedBy = JSON.parse(this.userService.getUserData());
            console.log(res.body.postedBy);
            feed.push(res.body);
            this.feedSubject.next(_.cloneDeep(feed));
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

  deletePost(postId: string): Observable<boolean> {
    return this.dataService.sendDELETE(`/deletePost/${postId}`).pipe(
      map((res: HttpResponse<any>) => {
        if (res.status === 200) {
          const posts = this.feedSubject.value;
          const postIndexToDelete = _.findIndex(posts, { _id: postId });
          posts.splice(postIndexToDelete, 1);
          this.feedSubject.next(_.cloneDeep(posts));
          return true;
        } else {
          return false;
        }
      })
    );
  }
}
