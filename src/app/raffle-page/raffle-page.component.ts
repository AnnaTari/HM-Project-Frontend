import {Component, Input} from '@angular/core';
import {Observable} from "rxjs";
import {EventModel} from "../shared/models/event.model";
import {WinnerApi} from "../api/winner.api";
import {EventApi} from "../api/event.api";
import {CurrentStateService} from "../shared/services/current-state.service";

@Component({
  selector: 'app-raffle-page',
  templateUrl: './raffle-page.component.html',
  styleUrls: ['./raffle-page.component.css']
})
export class RafflePageComponent {
  expiredEvents$: Observable<EventModel[]>;
  today: Date = new Date;

  constructor(private eventApi: EventApi, private winnerApi: WinnerApi, private currentStateService: CurrentStateService) {
    this.eventApi.check().subscribe((data)=> this.currentStateService.setEventObs(data));
    this.expiredEvents$ = this.currentStateService.getExpiredEvents();
    //this.winnerApi.check().
  }

  @Input()
  event: any= {eventHsvId: 0, adminId: 0, matchName: "", matchDetails: "", event_date: new Date(), location:"", deadline: new Date(), ticketType: 0, ticketAmount: 0, registrationDate: new Date()};

}
