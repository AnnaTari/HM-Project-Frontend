import {FormControl, FormGroup} from "@angular/forms";
import {MatDialog} from "@angular/material/dialog";
import { Component } from '@angular/core';
import {MatDialogService} from "../shared/services/mat-dialog.service";
import {Observable} from "rxjs";
import {EventModel} from "../shared/models/event.model";
import {EventApi} from "../api/event.api";


@Component({
  selector: 'app-event-page',
  templateUrl: './event-page.component.html',
  styleUrls: ['./event-page.component.css']
})
export class EventPageComponent {

  participationForm = new FormGroup({
    name: new FormControl(''),
    email: new FormControl(''),
    escortname: new FormControl(``),

  })
  events$: Observable<EventModel[]>;
  constructor(private eventApi: EventApi) {
    this.events$ = this.eventApi.check();
  }


  onSubmit() {

  }
}
