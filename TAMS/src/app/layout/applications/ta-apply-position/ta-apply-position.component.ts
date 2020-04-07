import {Component, OnInit} from '@angular/core';
import {CustomCourseService} from "../../../services/course.service";

@Component({
  selector: 'ta-apply-position',
  templateUrl: './ta-apply-position.component.html',
  styleUrls: ['./ta-apply-position.component.css']
})
export class TaApplyPositionComponent implements OnInit {

  constructor(private service: CustomCourseService) {
  }

  courses: []

  ngOnInit() {
    this.service
      .getAllCourses()
      .then(courses => this.courses = courses);
  }

}
