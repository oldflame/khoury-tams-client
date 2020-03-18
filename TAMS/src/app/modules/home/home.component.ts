import { Component, OnInit } from "@angular/core";
import { CourseService } from "src/app/services/course.service";
import { Course } from "src/app/models/course";
import { Observable } from "rxjs";
import { MatTabChangeEvent } from '@angular/material/tabs';

@Component({
  selector: "home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"]
})
export class HomeComponent implements OnInit {
  courses$: Observable<Course[]>;
  constructor(private courseService: CourseService) {}

  ngOnInit(): void {
    this.courses$ = this.courseService.courses$;
    this.getCoursesByStream("1");
  }

  getCoursesByStream(stream: string) {
    this.courseService.getCourseByStream(stream).subscribe();
  }

  tabChanged(eventArgs: MatTabChangeEvent) {
    console.log("Tab Changed", eventArgs);
    this.getCoursesByStream((eventArgs.index + 1) + "");
  }
}
