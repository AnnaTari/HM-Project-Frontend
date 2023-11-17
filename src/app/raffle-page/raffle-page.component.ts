import {Component, Input, OnInit} from '@angular/core';
import {map, Observable, of} from "rxjs";
import {EventModel} from "../shared/models/event.model";
import {WinnerApi} from "../api/winner.api";
import {EventApi} from "../api/event.api";
import {CurrentStateService} from "../shared/services/current-state.service";
import {EventWithPictureModel} from "../shared/models/eventWithPicture.model";
import {WinnerModel} from "../shared/models/winner.model";

@Component({
  selector: 'app-raffle-page',
  templateUrl: './raffle-page.component.html',
  styleUrls: ['./raffle-page.component.css']
})
export class RafflePageComponent {
  expiredEvents$: Observable<EventWithPictureModel[]>;
  mainWinners$: Observable<WinnerModel[]>;
  substituteWinners$: Observable<WinnerModel[]>;
  today: Date = new Date;
  winner$:any;

  constructor(private eventApi: EventApi, private winnerApi: WinnerApi, private currentStateService: CurrentStateService) {
    this.winner$ = this.currentStateService.getWinner();
    this.eventApi.check().subscribe((data)=> this.currentStateService.separateActualAndFutureEvents(data));
    this.expiredEvents$ = this.currentStateService.getExpiredEvents();
    this.expiredEvents$.subscribe(events => {
      console.log(events);
    })

    //initialize main- and substitute winners
    this.mainWinners$ = of([]);
    this.substituteWinners$ = of ([]);

  }

//Creating Observables Winners and Substitute Winners to display two different groups in html file
  startLottery (event: EventWithPictureModel): void {
    this.winnerApi.startLottery(event).subscribe(winners => {
      this.mainWinners$ = of(winners).pipe(
        map(winners => winners.filter(winner => winner.winner === true))
      );
      this.substituteWinners$ = of(winners).pipe(
        map(winners => winners.filter(winner => winner.substituteWinner === true))
      );
    });
  }
}
