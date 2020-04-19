import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'course-review',
  templateUrl: './course-review.component.html',
  styleUrls: ['./course-review.component.css']
})
export class CourseReviewComponent implements OnInit {

  constructor(private userService: UserService, private route: ActivatedRoute) { }

  courseId: ''
  loggedInUser: any;

  ngOnInit(): void {
    this.loggedInUser = JSON.parse(this.userService.getUserData());
    this.route.params.subscribe(params => {
      this.courseId = params.courseId;
      console.log(this.courseId);
    })
  }

}
