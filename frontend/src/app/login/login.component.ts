import { Component, OnInit } from '@angular/core';
import { SocketService } from '../socket.service';
import { User } from '../User';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { FailedLoginDialogComponent } from '../failed-login-dialog/failed-login-dialog.component';

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

  openErrorDialog(error: string) {

    const dialogConfig = new MatDialogConfig();

    dialogConfig.data = {
      type: error
    };

    dialogConfig.width = '500px';
    dialogConfig.height = '200px';

    dialogConfig.autoFocus = true;

    this.dialog.open(FailedLoginDialogComponent, dialogConfig);
}

  connect_to_room(name: string, room: string) {


    if (name != undefined && room != undefined && name.length > 0 && room.length == 5) {

      this.SocketService.connect_to_room(name, room);
      this.router.navigateByUrl('/dashboard')

    }

    else {

      this.openErrorDialog("Name or Room");

    }


  }

  host_room(name: string) {

    if (name != undefined && name.length > 0) {

      this.SocketService.hostRoom(name);
      this.router.navigateByUrl('/dashboard')

    }

    else {

      this.openErrorDialog("Name");

    }

  }

  constructor(private SocketService : SocketService, 
              public UserService: UserService,
              private router: Router,
              private dialog: MatDialog) { 

    this.SocketService.getRoomID().subscribe( (data ) => {
      this.UserService.user.room = data as string;
  })

  }

  ngOnInit(): void {
  }

}
