import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {UserService} from 'src/app/services/user.service';

@Component({
  selector: 'course-review',
  templateUrl: './course-review.component.html',
  styleUrls: ['./course-review.component.css']
})
export class CourseReviewComponent implements OnInit {

  constructor(private userService: UserService, private route: ActivatedRoute) {
  }

  review: any = {courseId: '', userId: '', title: '', review: ''};
  allReviews: [];

  ngOnInit(): void {
    this.review.userId = JSON.parse(this.userService.getUserData())._id;
    this.route.params.subscribe(params => {
      this.review.courseId = params.courseId;
      this.getReviews();
    });
  }

  getReviews() {
    fetch(`http://localhost:7000/course/${this.review.courseId}/reviews`)
      .then(async response => {
        this.allReviews = await response.json()
        console.log(this.allReviews);
      });
  }

  submitReview() {
    fetch(`http://localhost:7000/course/${this.review.courseId}/reviews`, {
      method: 'POST',
      body: JSON.stringify(this.review),
      headers: {
        'content-type': 'application/json'
      }
    }).then(response => {
      console.log(response.json());
    });
    this.getReviews();
  }


}
