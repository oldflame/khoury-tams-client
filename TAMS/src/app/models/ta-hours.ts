import { Moment } from "moment";

export interface TaHours {
  taID: string;
  date: Moment;
  hours: number;
  notes: string;
  submittedAt: Moment;
  confirmedAt: Moment;
}
