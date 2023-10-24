import { Component } from '@angular/core';
import {EventModel} from "../shared/models/event.model";
import {CurrentStateService} from "../shared/services/current-state.service";

@Component({
  selector: 'app-admin-edit',
  templateUrl: './admin-edit.component.html',
  styleUrls: ['./admin-edit.component.css']
})
export class AdminEditComponent {

  constructor(private currentStateService: CurrentStateService) {
  }

   actualEvents: EventModel[] = [];

  futureEvents: EventModel[] = [];


}
