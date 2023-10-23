import { Component } from '@angular/core';
import {EventApi} from "../api/event.api";
import {Observable} from "rxjs";
import {EventModel} from "../shared/models/event.model";

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent {

  events$: Observable<EventModel[]>;
  constructor(private eventApi: EventApi) {
    this.events$ = this.eventApi.check();
  }
}
