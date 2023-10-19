import {Component, Input} from '@angular/core';
import {EventModel} from "../../models/event.model";

@Component({
  selector: 'app-event-detail',
  templateUrl: './event-detail.component.html',
  styleUrls: ['./event-detail.component.css']
})
export class EventDetailComponent {
  @Input()
  event: EventModel = {id: 0, title: ""};

}
