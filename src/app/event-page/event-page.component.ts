import { Component } from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {MatDialog} from "@angular/material/dialog";
import {PopUpComponent} from "../shared/components/pop-up/pop-up.component";
import {MatDialogService} from "../shared/services/mat-dialog.service";


@Component({
  selector: 'app-event-page',
  templateUrl: './event-page.component.html',
  styleUrls: ['./event-page.component.css']
})
export class EventPageComponent {
  participationForm = new FormGroup({
    name: new FormControl(''),
    email: new FormControl(''),
    escortname: new FormControl(``)
  })




  constructor(private matDialogService: MatDialogService) {}
  onSubmit() {
    this.matDialogService.openDialogWithVariableText("Vielen Dank für die Teilnahme!")
  }
}
