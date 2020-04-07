import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import * as moment from "moment";
import { Moment } from "moment";

@Component({
  selector: "day-card",
  templateUrl: "./day-card.component.html",
  styleUrls: ["./day-card.component.css"],
})
export class DayCardComponent implements OnInit {
  constructor() {}
  months;
  weeks;
  hourForm: FormGroup = new FormGroup({
    hours: new FormControl("", [Validators.required]),
    activities: new FormControl("", [Validators.required]),
  });

  ngOnInit(): void {
    const startDate = moment("01-05-2020", "MM-DD-YYYY");
    const endDate = startDate.clone().add(4, "month");
    console.log("OUT", startDate, endDate);
    this.weeks = this.getDaysOfWeek(startDate, endDate);
  }

  getDaysOfWeek(startDate: Moment, endDate: Moment) {
    console.log("IN", startDate, endDate);
    const weeks = [];
    let weekStart = moment(startDate);
    let weekEnd = moment(weekStart).endOf("week");
    while (weekStart.unix() <= endDate.unix()) {
      let days: Moment[] = [];
      let day: Moment = weekStart.clone();
      console.log("WEEK START", weekStart);
      while (day.unix() <= weekEnd.unix()) {
        console.log("LATEST PRINT ", day);
        days.push(day);
        day = moment(weekStart.add(1, "day"));
      }
      weeks.push(days);
      days = [];

      weekStart = moment(weekEnd).add(1, "day");
      weekEnd = moment(weekStart).endOf("week");
    }
    console.log(weeks);
    return weeks;
  }
}
