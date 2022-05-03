import { Component, OnInit } from '@angular/core';
import { Movie } from '../Movie';
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

  }

  removeMovie(movie: Movie){

    this.movies = this.movies.filter(h => h !== movie);

  }

  constructor(public UserService : UserService) { 

    // this.movies.push(this.m);
    // this.movies.push(this.m2);

  }

  ngOnInit(): void {
  }

}
