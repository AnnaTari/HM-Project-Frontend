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
  today: Date = new Date;

  constructor(private eventApi: EventApi, private currentStateService: CurrentStateService) {
    this.eventApi.check().subscribe((data)=> this.currentStateService.setEventObs(data));
    this.events$ = this.currentStateService.getEventObs();
  }

  @Input()
  event: any= {eventHsvId: 0, adminId: 0, matchName: "", matchDetails: "", event_date: new Date(), location:"", deadline: new Date(), ticketType: 0, ticketAmount: 0, registrationDate: new Date()};

  //Filter Current and Future Events
  filterCurrentEvents(registrationDate: Date): boolean {
    return registrationDate <= this.today;
     }
    filterFutureEvents (registrationDate: Date): boolean {
    return registrationDate > this.today;
    }

 /* filterCurrentDates() {
    this.events$ = this.events$.filter(event=> {
      const eventDate = new Date(event.event_date);
      return eventDate >= this.today;
    });
  } */
}
