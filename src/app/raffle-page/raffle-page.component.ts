import {Component, Input, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {EventModel} from "../shared/models/event.model";
import {WinnerApi} from "../api/winner.api";
import {EventApi} from "../api/event.api";
import {CurrentStateService} from "../shared/services/current-state.service";
import {EventWithPictureModel} from "../shared/models/eventWithPicture.model";

@Component({
  selector: 'app-raffle-page',
  templateUrl: './raffle-page.component.html',
  styleUrls: ['./raffle-page.component.css']
})
export class RafflePageComponent {
  expiredEvents$: Observable<EventWithPictureModel[]>;
  today: Date = new Date;
  winners:any;

  constructor(private eventApi: EventApi, private winnerApi: WinnerApi, private currentStateService: CurrentStateService) {
    this.eventApi.check().subscribe((data)=> this.currentStateService.separateActualAndFutureEvents(data));
    this.expiredEvents$ = this.currentStateService.getExpiredEvents();
    this.expiredEvents$.subscribe(events => {
      console.log(events);
    })

  }


  startLottery (event: EventWithPictureModel): void {
    this.winnerApi.startLottery(event).subscribe(winners => this.currentStateService.setWinner(winners));
  }
}
