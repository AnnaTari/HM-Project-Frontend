import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {PopupActionModel} from "../../models/popup-action.model";
import {MatSnackBar, MatSnackBarConfig} from "@angular/material/snack-bar";

@Component({
  selector: 'app-pop-up',
  templateUrl: './pop-up.component.html',
  styleUrls: ['./pop-up.component.css'],
})
export class PopUpComponent {
  actualRoute: string;

  constructor(public dialogRef: MatDialogRef<PopUpComponent>, @Inject(MAT_DIALOG_DATA) public data: PopupActionModel, private snackBar: MatSnackBar) {
    this.actualRoute = this.data.route[this.data.route.length - 1];
    console.log(this.actualRoute);
  }

  deleteEvent() {
    let config = new MatSnackBarConfig();
    config.panelClass = ['custom-class'];
    this.snackBar.open("Das Event wurde gelöscht", "", {duration: 2000})
    this.data.action = true;
    this.dialogRef.close(this.data);
  }

  // popup works, but finished button is left
  onFinish() {
    console.log("Fertig-Button wurde geklickt!");
    this.snackBar.open("Fertig", "", {duration: 2000});
    this.data.action = true;
    this.dialogRef.close();
  }
}
