import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor() { }

  getUserById = (userId) =>
  fetch(`http://localhost:7000/users/${userId}`)
    .then(response => response.json())
}
