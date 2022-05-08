import { Component, OnInit } from '@angular/core';
import { Movie } from '../Movie';
import { SocketService } from '../socket.service';
import { User } from '../User';
import { UserService } from '../user.service';

import {ViewChild} from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { RandommoviedialogComponent } from '../randommoviedialog/randommoviedialog.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  @ViewChild('table') table: any;

  movies : Movie[] = [];

  titleText: string = "";

  openRandomMovieDialog(name: string, title: string) {

    const dialogConfig = new MatDialogConfig();

    dialogConfig.data = {
      name: name,
      title: title
    };

    dialogConfig.width = '300px';
    dialogConfig.height = '175px';

    dialogConfig.autoFocus = true;

    this.dialog.open(RandommoviedialogComponent, dialogConfig);
}

  randomMovie() {

    if (this.movies.length == 0) {

      return;

    }

    const randomElement = this.movies[Math.floor(Math.random() * this.movies.length)];
    
    console.log(randomElement);

    this.openRandomMovieDialog(randomElement.user.name, randomElement.title);
    
    return randomElement;

  }

  addMovie(title: string, user: User) {

    this.UserService.printUser();

    let movie = {user: user, title: title};

    this.movies.push(movie);

    this.titleText = '';

    this.SocketService.addMovie(title, user);

    this.table.renderRows();

  }

  removeMovie(movie: Movie){

    this.movies = this.movies.filter(h => h !== movie);

    this.SocketService.removeMovie(movie.title, movie.user);

    this.table.renderRows();

  }

  constructor(public UserService : UserService,
              public SocketService: SocketService,
              private dialog: MatDialog) { 

    this.SocketService.getMovieAdd().subscribe( (data) => {

      const user = {name: data['user']['name'], room: data['user']['room']};
      
      const movie = {title: data['title'], user: user};

      this.movies.push(movie);

    })

    this.SocketService.getMovieRemove().subscribe( (data ) => {

      const user = {name: data['user']['name'], room: data['user']['room']};
      
      const movie = {title: data['title'], user: user};

      this.movies = this.movies.filter(h => h.title !== movie.title && h.user.name !== movie.user.name && h.user.room !== movie.user.room);

    })

  }

  ngOnInit(): void {
  }

}
