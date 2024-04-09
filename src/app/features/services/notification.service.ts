import { FormGroup } from '@angular/forms';
import { Injectable } from '@angular/core';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  constructor(private _snackBar: MatSnackBar) {}

  openSnackBar(
    message: string,
    horizontalPosition: MatSnackBarHorizontalPosition,
    verticalPosition: MatSnackBarVerticalPosition,
    duration: number
  ) {
    this._snackBar.open(message, '', {
      horizontalPosition: horizontalPosition,
      verticalPosition: verticalPosition,
      duration: duration,
      panelClass: ['custom-snackbar'],
    });
  }
}
