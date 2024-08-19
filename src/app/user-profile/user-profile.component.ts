import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

// Import to bring in the API call created in 6.2
import { FetchApiDataService } from '../fetch-api-data.service';
import { DirectorInfoComponent } from '../director-info/director-info.component';
import { MovieSynopsisComponent } from '../movie-synopsis/movie-synopsis.component';
import { GenreInfoComponent } from '../genre-info/genre-info.component';

// Import to display notifications back to the user
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent implements OnInit {
  @Input() userData = {
    Name: '',
    Password: '',
    Email: '',
    Birthday: '',
  };

  user: any = {};
  movies: any[] = [];
  FavoriteMovies: any[] = [];

  /**
   * Creates an instance of UserProfileComponent.
   * @param fetchApiData - API data fetching service.
   * @param dialog - Angular Material dialog service.
   * @param snackBar - Angular Material snackbar service.
   * @param router - Angular Router service.
   */

  constructor(
    public fetchApiData: FetchApiDataService,
    public snackBar: MatSnackBar,
    private router: Router,
    public dialog: MatDialog
  ) {}

  /**
   * Lifecycle hook that is called after data-bound properties of a directive are initialized.
   */

  ngOnInit(): void {
    this.getProfile();
    this.getFavMovies();
  }

  /**
   * Fetches the user's profile information and favorite movies.
   * @returns void
   */
  getProfile(): void {
    this.user = this.fetchApiData.getUser();
    this.user.Birthday = new Date(this.user.Birthday)
      .toISOString()
      .slice(0, 10);
  }

  /**
   * Updates the user's profile information.
   * @returns Promise<void>
   */

  updateUser(): void {
    this.fetchApiData.editUser(this.user._id, this.userData).subscribe(
      (result: any) => {
        localStorage.setItem('user', JSON.stringify(result));
        this.snackBar.open('User update successful', 'OK', {
          duration: 2000,
        });
      },
      (error: any) => {
        this.snackBar.open('Failed to update user', 'OK', {
          duration: 2000,
        });
      }
    );
  }
  /**
   * Deletes the user's account after confirmation.
   * @returns Promise<void>
   */
  deleteUser(): void {
    this.router.navigate(['welcome']).then(() => {
      localStorage.clear();
      this.snackBar.open('User successfully deleted.', 'OK', {
        duration: 2000,
      });
    });
    this.fetchApiData.deleteUser().subscribe(() => {});
  }

  /**
   * Function for getting all movies.
   * @returns All movies.
   */
  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;

      return this.movies;
    });
  }

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

  openGenreDialog(name: string, description: string): void {
    this.dialog.open(GenreInfoComponent, {
      data: {
        Name: name,
        Description: description,
      },
      width: '450px',
    });
  }

  openSynopsisDialog(description: string): void {
    this.dialog.open(MovieSynopsisComponent, {
      data: {
        Description: description,
      },
      width: '450px',
    });
  }

  /**
   * Function to get favMovie list.
   * @returns Favorite movies of user.
   */
  getFavMovies(): void {
    this.user = this.fetchApiData.getUser();

    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      this.FavoriteMovies = this.movies.filter((movie) => {
        return this.user.FavoriteMovies.includes(movie._id);
      });

      return this.FavoriteMovies;
    });
  }

  /**
   * Function to check if movie is a favorite movie.
   * @param movie  - Movie object to check.
   * @returns {boolean} - Boolean indicating whether the movie is a favorite.
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
   * Function to delete movie from favMovie list.
   * @param {any} movie - Movie to delete from favorite movies.
   * @returns Message "Movie has been deleted from your favorites!"
   */
  deleteFavMovies(movie: any): void {
    this.user = this.fetchApiData.getUser();
    this.userData.Name = this.user.Username;
    this.fetchApiData
      .deleteFavouriteMovies(this.user._id, movie)
      .subscribe((result) => {
        localStorage.setItem('user', JSON.stringify(result));
        this.getFavMovies();
        this.getProfile();
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
