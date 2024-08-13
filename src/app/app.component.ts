// src/app/app.component.ts
import { Component } from '@angular/core';
import { UserRegistrationFormComponent } from './user-registration-form/user-registration-form.component';
import { UserLoginFormComponent } from './user-login-form/user-login-form.component';
import { MatDialog } from '@angular/material/dialog';
import { MovieCardComponent } from './movie-card/movie-card.component';
// import { FormControl } from '@angular/forms';
// import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  // valueForm = new FormGroup({
  //   // input: new FormControl(),
  //   name: new FormControl(''),
  //   password: new FormControl(''),
  //   email: new FormControl(''),
  //   birthday: new FormControl(''),
  // });
  // title = 'myMovie-Angular-client';

  // onSubmit() {
  //   console.log(this.valueForm.value);
  // }

  constructor(public dialog: MatDialog) {}
  //Function that will open the dialog when the signup button is clicked
  openUserRegistrationDialog(): void {
    this.dialog.open(UserRegistrationFormComponent, {
      // Assign dialog width
      width: '280px',
    });
  }
  openMoviesDialog(): void {
    this.dialog.open(MovieCardComponent, {
      width: '500px',
    });
  }
  //Function that will open the dialog when the login button is clicked
  openUserLoginDialog(): void {
    this.dialog.open(UserLoginFormComponent, {
      // Assign dialog width
      width: '280px',
    });
  }
}
