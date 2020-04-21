export interface User {
  _id: string;
  email: string;
  firstName: string;
  lastName: string;
  PhoneNumber: number;
  role: string;
  password: string;
  followers: string[];
  following: string[];
}
