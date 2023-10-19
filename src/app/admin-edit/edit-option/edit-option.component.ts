import {Component, Input} from '@angular/core';
import {EventModel} from "../../shared/models/event.model";

@Component({
  selector: 'app-edit-option',
  templateUrl: './edit-option.component.html',
  styleUrls: ['./edit-option.component.css']
})
export class EditOptionComponent {
  @Input()
  event: EventModel = {id: 0, title:""};

  constructor() {
  }

  deleteEvent() {

  }

  editEvent() {

  }
}
