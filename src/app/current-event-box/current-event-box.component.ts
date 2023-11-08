import {Component, Input} from '@angular/core';
import {Router} from "@angular/router";
import {EventModel} from "../shared/models/event.model";

@Component({
  selector: 'app-current-event-box',
  templateUrl: './current-event-box.component.html',
  styleUrls: ['./current-event-box.component.css']
})
export class CurrentEventBoxComponent {

  constructor (private router: Router) { }

  navigateToEventPage(eventHsvId: number) {
    this.router.navigate(['./event-page', eventHsvId],);
  }

 @Input()
  event: EventModel= {eventHsvId: 0, adminId: 0, matchName: "", matchDetails: "", eventDate: new Date(), picture: null, location:"", deadline: new Date(), ticketType: 0, ticketAmount: 0, registrationDate: new Date()};

}
