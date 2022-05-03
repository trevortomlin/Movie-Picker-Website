import { Component, OnInit } from '@angular/core';
import { SocketService } from '../socket.service';
import { User } from '../User';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

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
      this.router.navigateByUrl('/dashboard')

    }

    else {

      console.log("Invalid Name or Room");

    }


  }

  host_room(name: string) {

    if (name.length > 0) {

      this.SocketService.hostRoom(name);
      this.router.navigateByUrl('/dashboard')

    }

    else {

      console.log("Invalid Name");

    }

  }

  constructor(private SocketService : SocketService, 
              public UserService: UserService,
              private router: Router) { 

    this.SocketService.getRoomID().subscribe( (data ) => {
      this.UserService.user.room = data as string;
  })

  }

  ngOnInit(): void {
  }

}
