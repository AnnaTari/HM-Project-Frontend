import {Component, Input} from '@angular/core';
import {EventModel} from "../../shared/models/event.model";
import {MatDialog} from "@angular/material/dialog";
import {PopUpComponent} from "../../shared/components/pop-up/pop-up.component";

@Component({
  selector: 'app-edit-option',
  templateUrl: './edit-option.component.html',
  styleUrls: ['./edit-option.component.css']
})
export class EditOptionComponent {
  @Input()
  event?: EventModel;
  constructor(public dialog: MatDialog) {
  }

  openDialog() {
    let dialogRef = this.dialog.open(PopUpComponent, {
      data: this.event
    });
  }

  editEvent() {

  }
}
