import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';

/**
 * Base URL of the API.
 */
const apiUrl = 'https://infinite-sea-93950-c4e971611e32.herokuapp.com';

/**
 * Injectable service for fetching data from the API.
 */
@Injectable({
  providedIn: 'root',
})
export class FetchApiDataService {
  /** Constructs a new FetchApiDataService with the HttpClient injected.
   * @constructor
   * @param {HttpClient} http - For making HTTP requests.
   */
  constructor(private http: HttpClient) {}

  /**
   * api call for the user registration endpoint.
   *
   * @public
   * @param {*} userDetails
   * @returns {Observable<any>}
   */
  public userRegistration(userDetails: any): Observable<any> {
    userDetails.Birthday = new Date(userDetails.Birthday)
      .toISOString()
      .slice(0, 10);

    return this.http
      .post(apiUrl + '/users', userDetails)
      .pipe(catchError(this.handleError));
  }

  /**
   * Making the api call for the user login endpoint
   *
   * @param {any} userDetails - User details for login.
   * @returns {Observable<any>} - Observable for the API response.
   */
  public userLogin(userDetails: any): Observable<any> {
    return this.http
      .post(
        apiUrl +
          `/login?Name=${userDetails.Name}&Password=${userDetails.Password}`,
        undefined
      )
      .pipe(catchError(this.handleError));
  }

  /**
   * Making the api call for the Get All Movies endpoint
   * @returns {Observable<any>} - Observable for the API response.
   */

  getAllMovies(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(apiUrl + '/movies', {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * Non-typed response extraction.
   * @param {Object} res - API response.
   * @returns {any} - Extracted response data.
   */
  private extractResponseData(res: Object): any {
    const body = res;
    return body || {};
  }

  /**
   * Making the api call for the Get One Movie endpoint.
   * @param {string} title - One movie title.
   * @returns {Observable<any>} - Observable for the API response.
   */
  getMovieByTitle(title: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(apiUrl + '/movies/' + title, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * Making the api call for the Get Director endpoint.
   * @returns {Observable<any>} - Observable for the API response.
   */
  getDirector(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(apiUrl + '/movies/directors/:Name', {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * Making the api call for the Get Genre endpoint.
   * @returns {Observable<any>} - Observable for the API response.
   */
  getGenre(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(apiUrl + '/movies/genre/:Name', {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * Making the api call for the Get User endpoint.
   * @returns {Observable<any>} - Observable for the API response.
   */
  getUser(): Observable<any> {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    return user;
  }

  /**
   * API to add favourite movie to the user
   *
   * @param {string} userId
   * @param {*} movie
   * @returns {Observable<any>}
   */
  addFavouriteMovies(userId: string, movie: any): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .patch(apiUrl + '/users/' + userId + '/movies/' + movie._id, null, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * Making the api call for the Edit User endpoint.
   *
   * @param {string} userId
   * @param {*} userDetails
   * @returns {Observable<any>}
   */
  editUser(userId: string, userDetails: any): Observable<any> {
    userDetails.Birthday = new Date(userDetails.Birthday)
      .toISOString()
      .slice(0, 10);

    const token = localStorage.getItem('token');
    return this.http
      .put(apiUrl + '/users/' + userId, userDetails, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * Making the api call for the delete user
   *
   * @param {string} userId
   * @returns {Observable<any>}
   */
  deleteUser(userId: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .delete(apiUrl + '/users/' + userId, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * Making the api call for the Delete a Movie to Favourite Movies endpoint
   *
   * @param {string} userId
   * @param {*} movie
   * @returns {Observable<any>}
   */
  deleteFavouriteMovies(userId: string, movie: any): Observable<any> {
    const token = localStorage.getItem('token');

    return this.http
      .delete(apiUrl + '/users/' + userId + '/favorites/' + movie._id, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * Handling of HTTP errors.
   * @param {HttpErrorResponse} error - HTTP error response.
   * @returns {any} - Error details.
   */
  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('Some error occurred:', error.error.message);
    } else {
      console.error(
        `Error Status code ${error.status}, ` +
          `Error body is: ${JSON.stringify(error.error)}`
      );
    }
    return throwError('Something bad happened; please try again later.');
  }
}
