import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { UserService } from "src/app/services/user.service";
import { CustomCourseService } from "src/app/services/course.service";

@Component({
  selector: "course-review",
  templateUrl: "./course-review.component.html",
  styleUrls: ["./course-review.component.css"],
})
export class CourseReviewComponent implements OnInit {
  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private customService: CustomCourseService
  ) {}

  review: any = {
    courseId: "",
    userId: "",
    title: "",
    review: "",
    takenBefore: false,
    semesterTaken: "",
    yearTaken: "",
    firstName: "",
    lastName: "",
  };
  course: any;
  semesters: any = ["Fall", "Spring", "Summer"];
  allReviews: [];
  currentUser: any;

  ngOnInit(): void {
    this.currentUser = JSON.parse(this.userService.getUserData());
    this.review.userId = this.currentUser._id;
    this.review.firstName = this.currentUser.firstName;
    this.review.lastName = this.currentUser.lastName;
    this.route.params.subscribe((params) => {
      this.review.courseId = params.courseId;
      this.customService.getCourseById(this.review.courseId).then((course) => {
        this.course = course[0];
        console.log(this.course);
      });
      this.getReviews();
    });
  }

  getReviews() {
    fetch(`http://localhost:7000/course/${this.review.courseId}/reviews`).then(
      async (response) => {
        this.allReviews = await response.json();
        // console.log(this.allReviews);
      }
    );
  }

  submitReview() {
    console.log(this.review);
    fetch(`http://localhost:7000/course/${this.review.courseId}/reviews`, {
      method: "POST",
      body: JSON.stringify(this.review),
      headers: {
        "content-type": "application/json",
      },
    }).then((response) => {
      console.log(response.json());
    });
    this.getReviews();
  }
}
