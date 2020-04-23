import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { Feed } from "src/app/models/feed";
import { FeedService } from "src/app/services/feed.service";
import { User } from "src/app/models/user";
import { UserService } from "src/app/services/user.service";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { COMMA, ENTER } from "@angular/cdk/keycodes";
import { MatChipInputEvent } from "@angular/material/chips";
import { map } from "rxjs/operators";
import * as _ from "lodash";
import * as moment from "moment";

@Component({
  selector: "feed",
  templateUrl: "./feed.component.html",
  styleUrls: ["./feed.component.css"],
})
export class FeedComponent implements OnInit {
  feed$: Observable<Feed[]>;
  currentUser: User;
  tags: string[] = [];
  selectable = true;
  removable = true;
  addOnBlur = true;

  postForm: FormGroup = new FormGroup({
    title: new FormControl("", [Validators.required]),
    content: new FormControl("", [Validators.required]),
  });

  readonly separatorKeysCodes: number[] = [ENTER, COMMA];

  constructor(
    private feedService: FeedService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.currentUser = JSON.parse(this.userService.getUserData());
    this.feed$ = this.feedService.feed$.pipe(
      map((feed) => {
        if (feed) {
          return _.sortBy(feed, (post) => moment(post.timestamp)).reverse();
        }
        return feed;
      })
    );
    this.feedService.getFeed(this.currentUser._id).subscribe();
  }

  addTag(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our tag
    if ((value || "").trim()) {
      this.tags.push(value.trim());
    }

    // Reset the input value
    if (input) {
      input.value = "";
    }
  }

  removeTag(tag: string): void {
    const index = this.tags.indexOf(tag);

    if (index >= 0) {
      this.tags.splice(index, 1);
    }
  }

  submitPost() {
    const post = {
      title: this.postForm.value.title,
      content: this.postForm.value.content,
      tags: this.tags,
      postedBy: this.currentUser._id,
      postedByRole: this.currentUser.role,
    };
    this.feedService.submitPost(post).subscribe();
  }

  deletePost(postId: string) {
    this.feedService.deletePost(postId).subscribe();
  }
}
