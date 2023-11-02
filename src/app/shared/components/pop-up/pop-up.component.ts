import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {PopupActionModel} from "../../models/popup-action.model";

@Component({
  selector: 'app-pop-up',
  templateUrl: './pop-up.component.html',
  styleUrls: ['./pop-up.component.css'],
})
export class PopUpComponent {
  actualRoute: string;

  constructor(public dialogRef: MatDialogRef<PopUpComponent>, @Inject(MAT_DIALOG_DATA) public data: PopupActionModel) {
    this.actualRoute = this.data.route[this.data.route.length - 1];
  }

  deleteEvent() {
    this.data.action = true;
    this.dialogRef.close(this.data);
  }
}
