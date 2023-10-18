import { Component } from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";


@Component({
  selector: 'app-event-page',
  templateUrl: './event-page.component.html',
  styleUrls: ['./event-page.component.css']
})
export class EventPageComponent {
  participationForm = new FormGroup({
    name: new FormControl(''),
    email: new FormControl(''),
    escortname: new FormControl(``)
  })

  onSubmit() {

  }
}
