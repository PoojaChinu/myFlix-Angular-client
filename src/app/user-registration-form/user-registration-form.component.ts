// src/app/user-registration-form/user-registration-form.component.ts
import { Component, OnInit, Input } from '@angular/core';

// You'll use this import to close the dialog on success
import { MatDialogRef } from '@angular/material/dialog';

// This import brings in the API calls we created in 6.2
import { FetchApiDataService } from '../fetch-api-data.service';

// This import is used to display notifications back to the user
import { MatSnackBar } from '@angular/material/snack-bar';

import { FormControl } from '@angular/forms';

import { FormGroup } from '@angular/forms';

/**
 * The UserRegistrationFormComponent is used for user registration.
 */
@Component({
  selector: 'app-user-registration-form',
  templateUrl: './user-registration-form.component.html',
  styleUrls: ['./user-registration-form.component.scss'],
})
export class UserRegistrationFormComponent implements OnInit {
  /**
   * Description placeholder
   *
   * @type {{ Name: string; Password: string; Email: string; Birthday: string; }}
   */
  @Input() userData = { Name: '', Password: '', Email: '', Birthday: '' };

  valueForm = new FormGroup({
    // input: new FormControl(),
    name: new FormControl(''),
    password: new FormControl(''),
    email: new FormControl(''),
    birthday: new FormControl(''),
  });
  title = 'myMovie-Angular-client';

  onSubmit() {
    console.log(this.valueForm.value);
  }

  /**
   * Creates an instance of UserRegistrationFormComponent.
   * @param fetchApiData - Service to interact with the API.
   * @param dialogRef - Reference to the dialog opened.
   * @param snackBar - Service to show snack bar notifications.
   * */

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserRegistrationFormComponent>,
    public snackBar: MatSnackBar
  ) {}

  /**
   * Initializes the component.
   */
  ngOnInit(): void {}

  /**
   * Registers a new user by sending userData to the backend.
   */
  registerUser(): void {
    this.fetchApiData.userRegistration(this.userData).subscribe(
      (response: any) => {
        // Logic for a successful user registration goes here! (To be implemented)
        this.dialogRef.close(); // This will close the modal on success!
        this.snackBar.open('User registration is successful', 'OK', {
          duration: 2000,
        });
      },
      (response: any) => {
        this.snackBar.open('User registration failed', 'OK', {
          duration: 2000,
        });
      }
    );
  }
}
