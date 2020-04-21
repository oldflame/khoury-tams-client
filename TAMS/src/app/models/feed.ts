import { User } from './user';

export interface Feed {
  _id?: string;
  timestamp?: any;
  postedBy?: any;
  postedByRole?: string;
  tags?: string[];
  title?: string;
  content?: string;
}
