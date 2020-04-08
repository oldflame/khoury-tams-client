import { Moment } from "moment";

export interface TaHours {
  email: string;
  date: Moment;
  hours: number;
  notes: string;
  submittedAt: Moment;
  confirmedAt: Moment;
}
