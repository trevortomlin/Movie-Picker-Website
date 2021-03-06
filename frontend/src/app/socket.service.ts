import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { map } from 'rxjs/operators';

import { Movie } from './Movie';
import { User } from './User';

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  constructor(private socket: Socket) { }

  connect_to_room(name: string, room: string) {

    this.socket.emit("user connected", name, room);

  }

  hostRoom(name: string){

    this.socket.emit("user hosted", name);

  }

  getRoomID() {

    return this.socket.fromEvent<String>("roomid").pipe(map( data => data ));

  }

  getMovieAdd() {

    return this.socket.fromEvent<Movie>("add movie").pipe(map( data => data ));

  }

  getMovieRemove() {

    return this.socket.fromEvent<Movie>("remove movie").pipe(map( data => data ));

  }

  getRandomMovie() {

    return this.socket.fromEvent<Movie>("random movie").pipe(map( data => data ));

  }

  addMovie(title : string, user: User) {

    this.socket.emit("add movie", title, user.name, user.room);

  }

  removeMovie(title : string, user: User) {

    this.socket.emit("remove movie", title, user.name, user.room);

  }

  randomMovie(title : string, user: User) {

    this.socket.emit("random movie", title, user.name, user.room);

  }

}
