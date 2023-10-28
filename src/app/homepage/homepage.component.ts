import { Component } from '@angular/core';
import {EventApi} from "../api/event.api";
import {Observable} from "rxjs";
import {EventModel} from "../shared/models/event.model";
import {CurrentStateService} from "../shared/services/current-state.service";

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent {

  events$: Observable<EventModel[]>;

  constructor(private eventApi: EventApi, private currentStateService: CurrentStateService) {
    this.events$ = this.eventApi.check();
    this.currentStateService = currentStateService;
  }

  //events: EventModel[] = [];

}
