import {
  Component,
  OnInit,
  Input,
  AfterViewInit,
  ViewChild,
  OnChanges,
  SimpleChange,
  SimpleChanges,
  Output,
  EventEmitter,
} from "@angular/core";
import { Course } from "src/app/models/course";
import { MatTableDataSource } from "@angular/material/table";
import { MatPaginator } from "@angular/material/paginator";
import { FormControl } from "@angular/forms";
import { User } from "src/app/models/user";
import { UserService } from "src/app/services/user.service";

@Component({
  selector: "users-list",
  templateUrl: "./users-list.component.html",
  styleUrls: ["./users-list.component.css"],
})
export class UsersListComponent implements OnInit, OnChanges {
  @Input("usersList") usersList: User[];
  @Output("followUser") followUser = new EventEmitter();
  @Output("unFollowUser") unFollowUser = new EventEmitter();

  currentUser: User;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.currentUser = JSON.parse(this.userService.getUserData());
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.usersList && changes.usersList.currentValue != null) {
      this.currentUser = JSON.parse(this.userService.getUserData());
    }
  }
  followUserClicked(user: User) {
    this.followUser.emit({ user });
  }
  unFollowUserClicked(user: User) {
    this.unFollowUser.emit({ user });
  }
}
