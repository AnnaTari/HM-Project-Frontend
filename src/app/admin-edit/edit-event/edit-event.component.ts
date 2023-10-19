import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {EventService} from "../event.service";

@Component({
  selector: 'app-edit-event',
  templateUrl: './edit-event.component.html',
  styleUrls: ['./edit-event.component.css']
})
export class EditEventComponent implements OnInit {
  eventForm: FormGroup;

  constructor(private fb: FormBuilder, private eventService: EventService) {
    this.eventForm = this.fb.group({
      id: [0],
      title: [''],
    })
  }

  ngOnInit() {
    this.eventService.getDataFromBackend().subscribe(
      data => {
        this.eventForm.patchValue(data)
      }
    )
  }

  updateEvent() {

  }
}
