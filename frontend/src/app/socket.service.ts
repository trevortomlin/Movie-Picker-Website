import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { map } from 'rxjs/operators';

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
    //return this.socket.fromEvent('room joined');
  }

  getRoomID() {

    return this.socket.fromEvent("roomid").pipe(map( data => data ));

  }

}
