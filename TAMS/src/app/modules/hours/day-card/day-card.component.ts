import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import * as moment from "moment";
import { Moment } from "moment";
import { UserService } from "src/app/services/user.service";
import { FillHoursService } from "src/app/services/fill-hours.service";
import { Observable } from "rxjs";
import { Course } from "src/app/models/course";
import { TaHours } from "src/app/models/ta-hours";
import * as _ from "lodash";

@Component({
  selector: "day-card",
  templateUrl: "./day-card.component.html",
  styleUrls: ["./day-card.component.css"],
})
export class DayCardComponent implements OnInit {
  constructor(
    private userService: UserService,
    private fillHours: FillHoursService
  ) {}
  months;
  weeks;
  hourForms: FormGroup[] = [];
  moment = moment;
  mapDays: any[];

  hours$: Observable<TaHours[]>;

  ngOnInit(): void {
    const startDate = moment("01-05-2020", "MM-DD-YYYY");
    const endDate = startDate.clone().add(4, "month");
    this.weeks = this.getDaysOfWeek(startDate, endDate);
    this.getAllSubmittedTaHoursForTA();
    this.hours$ = this.fillHours.allHours$;
    this.mapData();
  }

  getDaysOfWeek(startDate: Moment, endDate: Moment) {
    console.log("IN", startDate, endDate);
    const weeks = [];
    let weekStart = moment(startDate);
    let weekEnd = moment(weekStart).endOf("week");
    while (weekStart.unix() <= endDate.unix()) {
      let days: Moment[] = [];
      let day: Moment = weekStart.clone();
      while (day.unix() <= weekEnd.unix()) {
        days.push(day);
        this.hourForms.push(
          new FormGroup({
            day: new FormControl(day.unix(), []),
            hours: new FormControl("", [Validators.required]),
            activities: new FormControl("", [Validators.required]),
          })
        );

        if (day > moment().add(1, "day")) {
          this.hourForms[this.hourForms.length - 1].disable();
        }
        day = moment(weekStart.add(1, "day"));
      }
      weeks.push(days);
      days = [];

      weekStart = moment(weekEnd).add(1, "day");
      weekEnd = moment(weekStart).endOf("week");
    }
    return weeks;
  }

  submitTaHours(hourForm: any) {
    const taId = JSON.parse(this.userService.getUserData())._id;
    hourForm.taId = taId;
    this.fillHours.sendWeeklyHours(hourForm).subscribe();
  }

  getAllSubmittedTaHoursForTA() {
    console.log("IN USER DATA", JSON.parse(this.userService.getUserData())._id);
    this.fillHours
      .getAllHoursData(JSON.parse(this.userService.getUserData())._id)
      .subscribe();
  }

  mapData() {
    this.hours$.subscribe((hours) => {
      if (hours) {
        hours.forEach((hour) => {
          const formToUpdate = _.find(
            this.hourForms,
            (form: FormGroup) => form.value.day == hour.day
          );
          console.log(this.hourForms, formToUpdate);
          formToUpdate.get("hours").patchValue(hour.hours);
          formToUpdate.get("activities").patchValue(hour.activities);
          formToUpdate.disable();
        });
      }
    });
  }
}
