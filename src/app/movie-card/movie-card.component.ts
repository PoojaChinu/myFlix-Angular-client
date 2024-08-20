import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatDialog } from '@angular/material/dialog';
import { DirectorInfoComponent } from '../director-info/director-info.component';
import { GenreInfoComponent } from '../genre-info/genre-info.component';
import { MovieSynopsisComponent } from '../movie-synopsis/movie-synopsis.component';
// Import to display notifications back to the user
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss'],
})
export class MovieCardComponent implements OnInit {
  /**
   * Array to store all movies.
   */
  movies: any[] = [];
  /**
   * Information about the user, and favorite movies.
   */
  user: any = {};
  userData = { Username: '', FavoriteMovies: [] };
  FavoriteMovies: any[] = [];
  isFavMovie: boolean = false;

  /**
   * Creates an instance of MovieCardComponent.
   *
   * @constructor
   * @param {FetchApiDataService} fetchApiData
   * @param {MatDialog} dialog
   * @param {MatSnackBar} snackBar
   */
  constructor(
    public fetchApiData: FetchApiDataService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar
  ) {}

  /**
   * Lifecycle hook that is called after the component's view has been initialized.
   * Initializes the component by fetching favorites and movies.
   */
  ngOnInit(): void {
    this.getMovies();
    this.getFavMovies();
  }

  /**
   * Fetches all movies from the database.
   */
  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;

      return this.movies;
    });
  }

  /**
   * Opens dialog to display director information.
   *
   * @param {string} name
   * @param {string} bio
   * @param {string} birthYear
   */
  openDirectorDialog(name: string, bio: string, birthYear: string): void {
    this.dialog.open(DirectorInfoComponent, {
      data: {
        Name: name,
        Bio: bio,
        BirthYear: birthYear,
      },
      width: '450px',
    });
  }
  /**
   * Opens dialog to display genre information.
   *
   * @param {string} name
   * @param {string} description
   */
  openGenreDialog(name: string, description: string): void {
    this.dialog.open(GenreInfoComponent, {
      data: {
        Name: name,
        Description: description,
      },
      width: '450px',
    });
  }

  /**
   * Opens dialog to display movie synopsis.
   *
   * @param {string} description
   */
  openSynopsisDialog(description: string): void {
    this.dialog.open(MovieSynopsisComponent, {
      data: {
        Description: description,
      },
      width: '450px',
    });
  }
  /**
   * Retrieves user's favorite movies from local storage.
   */
  getFavMovies(): void {
    this.user = this.fetchApiData.getUser();
    this.userData.FavoriteMovies = this.user.FavoriteMovies;
    this.FavoriteMovies = this.user.FavoriteMovies;
  }
  /**
   * Adds a movie to user's favorites.
   *
   * @param {*} movie
   */
  addFavMovies(movie: any): void {
    this.user = this.fetchApiData.getUser();
    this.userData.Username = this.user.Username;

    this.fetchApiData
      .addFavouriteMovies(this.user._id, movie)
      .subscribe((result) => {
        localStorage.setItem('user', JSON.stringify(result));
        this.getFavMovies();
        this.snackBar.open('Movie has been added to your favorites!', 'OK', {
          duration: 3000,
        });
      });
  }

  /**
   * Checks if a movie is favorited by the user.
   *
   * @param {*} movie
   * @returns {*}
   */
  isFav(movie: any): any {
    const MovieID = movie._id;
    if (this.FavoriteMovies.some((movie) => movie === MovieID)) {
      return true;
    } else {
      return false;
    }
  }
  /**
   * Toggles the favorite status of a movie.
   * @param movie - The movie object.
   */
  toggleFavMovie(movie: any): void {
    const isFavorite = this.isFav(movie);
    isFavorite ? this.deleteFavMovies(movie) : this.addFavMovies(movie);
  }

  /**
   * Deletes a movie from user's favorites.
   * @param movie - The movie object to be removed.
   */
  deleteFavMovies(movie: any): void {
    this.user = this.fetchApiData.getUser();
    this.userData.Username = this.user.Username;
    this.fetchApiData
      .deleteFavouriteMovies(this.user._id, movie)
      .subscribe((result) => {
        localStorage.setItem('user', JSON.stringify(result));
        this.getFavMovies();
        this.snackBar.open(
          'Movie has been deleted from your favorites!',
          'OK',
          {
            duration: 3000,
          }
        );
      });
  }
}
