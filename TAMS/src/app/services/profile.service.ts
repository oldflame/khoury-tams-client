import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor() { }

  getUserById = (userId) =>
  fetch(`https://khoury-tams.herokuapp.com/users/${userId}`)
    .then(response => response.json())
}
