import {Component, OnInit} from '@angular/core';
import {CurrentStateService} from "../shared/services/current-state.service";
import {Observable} from "rxjs";
import {EventApi} from "../api/event.api";
import {EventWithPictureModel} from "../shared/models/eventWithPicture.model";


@Component({
  selector: 'app-admin-edit',
  templateUrl: './admin-edit.component.html',
  styleUrls: ['./admin-edit.component.css']
})
export class AdminEditComponent implements OnInit {
  actualEvents$: Observable<EventWithPictureModel[]>;
  futureEvents$: Observable<EventWithPictureModel[]>;

  constructor(private currentStateService: CurrentStateService, private eventApi: EventApi) {
    this.actualEvents$ = this.currentStateService.getActualEvents();
    this.futureEvents$ = this.currentStateService.getFutureEvents();
  }

  ngOnInit() {
    //gets all Events which are distinguished in the currentStateService to show the list of actual and future Events
    this.eventApi.getAllEvents().subscribe((events => {
      this.currentStateService.separateActualAndFutureEvents(events);
      console.log(events);
    }))
  }

}
