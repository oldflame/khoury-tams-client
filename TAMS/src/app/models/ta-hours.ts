import { Moment } from "moment";

export interface TaHours {
  taID: string;
  day: Moment;
  hours: number;
  activities: string;
  submittedAt: Moment;
  confirmedAt: Moment;
}
