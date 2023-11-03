import {Component, Input} from '@angular/core';
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
  actualEvents$: Observable<EventModel[]>;
  futureEvents$: Observable<EventModel[]>;
  today: Date = new Date;

  constructor(private eventApi: EventApi, private currentStateService: CurrentStateService) {
    this.eventApi.check().subscribe((data)=> this.currentStateService.setEventObs(data));
    this.actualEvents$ = this.currentStateService.getActualEvents();
    this.futureEvents$ = this.currentStateService.getFutureEvents();
    this.events$ = this.currentStateService.getEventObs();
  }

  @Input()
  event: any= {eventHsvId: 0, adminId: 0, matchName: "", matchDetails: "", event_date: new Date(), location:"", deadline: new Date(), ticketType: 0, ticketAmount: 0, registrationDate: new Date()};

  ngOnInit() {
    this.eventApi.check().subscribe((data => {
      this.currentStateService.separateActualAndFutureEvents(data);
    }))
  }


}
