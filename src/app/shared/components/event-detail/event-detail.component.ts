import {Component, Input} from '@angular/core';
import {EventWithPictureModel} from "../../models/eventWithPicture.model";


@Component({
  selector: 'app-event-detail',
  templateUrl: './event-detail.component.html',
  styleUrls: ['./event-detail.component.css']
})
export class EventDetailComponent {
  @Input()
  event: EventWithPictureModel = {eventHsvId:0, picture: new Uint8Array(), location: "", matchDetails: "", matchName:"", eventDate: new Date(), registrationDate: new Date(), ticketAmount: 0, ticketType: 0, adminId: 0, deadline: new Date()};
}
