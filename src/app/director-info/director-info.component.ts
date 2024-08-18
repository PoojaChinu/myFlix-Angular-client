import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

/**
 * @description Component representing the director info dialog.
 * @selector 'app-director-info'
 * @templateUrl './director-info.component.html'
 * @styleUrls ['./director-info.component.scss']
 */
@Component({
  selector: 'app-director-info',
  templateUrl: './director-info.component.html',
  styleUrls: ['./director-info.component.scss'],
})
export class DirectorInfoComponent implements OnInit {
  /** Creates an instance of DirectorInfoComponent.
   * @constructor - Constructor for DirectorInfoComponent.
   * @param - Data containing director information.
   */
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: {
      Name: string;
      Bio: string;
      BirthYear: string;
    }
  ) {}
  /**
   * Lifecycle hook that is called after data-bound properties of a directive are initialized.
   */
  ngOnInit(): void {}
}
