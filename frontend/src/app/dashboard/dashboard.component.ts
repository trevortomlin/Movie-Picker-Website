import { Component, OnInit } from '@angular/core';
import { Movie } from '../Movie';
import { SocketService } from '../socket.service';
import { User } from '../User';
import { UserService } from '../user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  movies : Movie[] = [];

  // m: Movie = {user: {name:"Chad", room:"test"}, title: "Shrek 2"};
  // m2: Movie = {user: {name:"Thad", room:"test"}, title: "Star Wars"};

  titleText: string = "";

  randomMovie() {

    const randomElement = this.movies[Math.floor(Math.random() * this.movies.length)];
    
    console.log(randomElement);
    
    return randomElement;

  }

  addMovie(title: string, user: User) {

    this.UserService.printUser();

    let movie = {user: user, title: title};

    this.movies.push(movie);

    this.titleText = '';

    this.SocketService.addMovie(title, user);

  }

  removeMovie(movie: Movie){

    this.movies = this.movies.filter(h => h !== movie);

    this.SocketService.removeMovie(movie.title, movie.user);

  }

  constructor(public UserService : UserService,
              public SocketService: SocketService) { 

    this.SocketService.getMovieAdd().subscribe( (data) => {

      const user = {name: data['user']['name'], room: data['user']['room']};
      
      const movie = {title: data['title'], user: user};

      this.movies.push(movie);

      //console.log(user);

      //this.addMovie(data['title'], user);
      //this.addMovie(data[0], data[1]);
      //console.log(data);
      //console.log(data['title'] + data['user'] );
      //console.log(typeof data);
      //console.log(data + " " + data[0] + " " + data[1]);
    })

    this.SocketService.getMovieRemove().subscribe( (data ) => {
      //console.log(data);
      //this.removeMovie(data['title']);

      const user = {name: data['user']['name'], room: data['user']['room']};
      
      const movie = {title: data['title'], user: user};

      this.movies = this.movies.filter(h => h.title !== movie.title && h.user.name !== movie.user.name && h.user.room !== movie.user.room);

    })

  }

  ngOnInit(): void {
  }

}