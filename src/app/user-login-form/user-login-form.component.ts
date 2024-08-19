import { Component, OnInit, Input } from '@angular/core';

// Import to close the dialog on success
import { MatDialogRef } from '@angular/material/dialog';

// Import to bring in the API call created in 6.2
import { FetchApiDataService } from '../fetch-api-data.service';

// Import to display notifications back to the user
import { MatSnackBar } from '@angular/material/snack-bar';

import { Router } from '@angular/router';

@Component({
  selector: 'app-user-login-form',
  templateUrl: './user-login-form.component.html',
  styleUrls: ['./user-login-form.component.scss'],
})
export class UserLoginFormComponent implements OnInit {
  /**
   * Object holding user data for login
   * @property {string} Name - The user's username
   * @property {string} Password - The user's password
   */
  @Input() userData = { Name: '', Password: '' };

  /**
   * Creates an instance of UserLoginFormComponent.
   * @param fetchApiData - API data fetching service.
   * @param dialogRef - Angular Material dialog reference.
   * @param snackBar - Angular Material snackbar service.
   * @param router - Angular Router service.
   */
  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserLoginFormComponent>,
    public snackBar: MatSnackBar,
    private router: Router
  ) {}

  /**
   * Lifecycle hook that is called after data-bound properties of a directive are initialized.
   */

  ngOnInit(): void {}

  // Function responsible for sending the form inputs to the backend
  loginUser(): void {
    this.fetchApiData.userLogin(this.userData).subscribe(
      (response: any) => {
        //Logic for a successful user login
        localStorage.setItem('user', JSON.stringify(response.user));
        localStorage.setItem('token', response.token);
        this.dialogRef.close(); // Will close modal on success (To be implemented)
        this.snackBar.open('User login successful', 'OK', {
          duration: 2000,
        });
        this.router.navigate(['movies']);
      },
      (response: any) => {
        this.snackBar.open('User login failed', 'OK', {
          duration: 2000,
        });
      }
    );
  }
}
