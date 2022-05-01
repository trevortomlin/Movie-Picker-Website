import { Component, OnInit } from '@angular/core';
import { SocketService } from '../socket.service';
import { User } from '../User';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user: User = {
    name: "",
    room: ""
  };

  connect_to_room(name: string, room: string) {

    if (name.length > 0 && room.length == 5) {

      this.SocketService.connect_to_room(name, room);

    }

    else {

      console.log("Invalid Name or Room");

    }


  }

  host_room(name: string) {

    this.SocketService.hostRoom(name);

  }

  constructor(private SocketService : SocketService) { 

    this.SocketService.getRoomID().subscribe( (data ) => {
      console.log('User data', data);
      this.user.room = data as string;
  })

  }

  ngOnInit(): void {
  }

}
