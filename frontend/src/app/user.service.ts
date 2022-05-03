import { Injectable, Input } from '@angular/core';
import { User } from './User';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  user = {} as User;

  getUser() {

    return this.user;

  }

  setUser(name: string, room: string) {

    this.user.name = name; 
    this.user.room = room;

  }

  userExists() {

    return this.user != null;

  }

  printUser(){

    console.log("name: " + this.user.name + " room: " + this.user.room);

  }

  constructor() {}
}
