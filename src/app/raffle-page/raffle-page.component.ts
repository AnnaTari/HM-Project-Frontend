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
    this.eventApi.check().subscribe((data)=> this.currentStateService.separateActualAndFutureEvents(data));
    this.expiredEvents$ = this.currentStateService.getExpiredEvents();
    this.expiredEvents$.subscribe(events => {
      console.log(events);
    })
    //this.winnerApi.check().
  }

  ngOnInit() {
    this.eventApi.check().subscribe((data => {
      this.currentStateService.separateActualAndFutureEvents(data);
    }))
  }

  startLottery (event:any): void {
    this.winnerApi.findAllParticipants().subscribe
  }
}
