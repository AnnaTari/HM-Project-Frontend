import {Component, OnInit} from '@angular/core';
import {EventModel} from "../shared/models/event.model";
import {CurrentStateService} from "../shared/services/current-state.service";
import {Observable} from "rxjs";
import {EventApi} from "../api/event.api";

@Component({
  selector: 'app-admin-edit',
  templateUrl: './admin-edit.component.html',
  styleUrls: ['./admin-edit.component.css']
})
export class AdminEditComponent implements OnInit {
  actualEvents$: Observable<EventModel[]>;
  futureEvents$: Observable<EventModel[]>;

  constructor(private currentStateService: CurrentStateService, private eventApi: EventApi) {
    this.actualEvents$ = this.currentStateService.getActualEvents();
    this.futureEvents$ = this.currentStateService.getFutureEvents();
  }

  ngOnInit() {
    this.eventApi.check().subscribe((data => {
      this.currentStateService.separateActualAndFutureEvents(data);
    }))
  }

}
