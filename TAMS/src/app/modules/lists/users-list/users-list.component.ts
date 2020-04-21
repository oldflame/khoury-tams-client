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

@Component({
  selector: "users-list",
  templateUrl: "./users-list.component.html",
  styleUrls: ["./users-list.component.css"],
})
export class UsersListComponent implements OnInit {
  @Input("usersList") usersList: User[];
  constructor() {}

  ngOnInit(): void {
  }
}
