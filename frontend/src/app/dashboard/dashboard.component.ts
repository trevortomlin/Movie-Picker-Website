import { Component, OnInit } from '@angular/core';
import { Movie } from '../Movie';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  movies : Movie[] = [];

  m: Movie = {user: {name:"Chad", room:"test"}, title: "Shrek 2"};
  m2: Movie = {user: {name:"Thad", room:"test"}, title: "Star Wars"};

  addMove(movie: Movie) {

    this.movies.push(movie);

  }

  removeMovie(movie: Movie){

    this.movies = this.movies.filter(h => h !== movie);

  }

  constructor() { 

    this.movies.push(this.m);
    this.movies.push(this.m2);

  }

  ngOnInit(): void {
  }

}
