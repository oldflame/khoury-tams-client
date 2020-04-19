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

  review: any = { courseId: '', userId: '', title: '', review: '' };

  allReviews: any = [
    { courseId: "5e719deaa542a32720278863", userId: "5e9b82ec3ba55edfbce9c800", title: "title 1", review: "review 1" },
    { courseId: "5e719deaa542a32720278863", userId: "5e9b82ec3ba55edfbce9c800", title: "title 2", review: "review 2" },
    { courseId: "5e719deaa542a32720278863", userId: "5e9b82ec3ba55edfbce9c800", title: "title 3", review: "review 3" },
    { courseId: "5e719deaa542a32720278863", userId: "5e9b82ec3ba55edfbce9c800", title: "title 4", review: "review 4" }
  ];

  ngOnInit(): void {
    this.review.userId = JSON.parse(this.userService.getUserData())._id;
    this.route.params.subscribe(params => {
      this.review.courseId = params.courseId;
    })
    fetch(`http://localhost:7000/course/${this.review.courseId}/reviews`)
      .then(response => {
        // console.log(response.json());
        
         this.allReviews = response.json()
         console.log(this.allReviews);
      })
      // .then(result => {
      //   this.allReviews = result;
      //   console.log(this.allReviews)

      // });
    console.log(this.review)
  }

  submitReview() {
    console.log(this.review)
    fetch(`http://localhost:7000/course/${this.review.courseId}/reviews`, {
      method: 'POST',
      body: JSON.stringify(this.review),
      headers: {
        'content-type': 'application/json'
      }
    }).then(response => {
      console.log(response.json())
    })
  }


}