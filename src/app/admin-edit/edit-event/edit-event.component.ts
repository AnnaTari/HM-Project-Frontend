import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-edit-event',
  templateUrl: './edit-event.component.html',
  styleUrls: ['./edit-event.component.css']
})
export class EditEventComponent {
  eventForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.eventForm = this.fb.group({
      matchName: ['', Validators.required],
      matchDetails: ['', Validators.required],
      matchDate: [Date, Validators.required],
      matchTime: ['', Validators.required],
      location: ['Volksparkstadion', Validators.required],
      gamePicture: [],
      deadline: [Date, Validators.required],
      ticketType: [2, Validators.required],
      ticketAmount: [0, Validators.required],
      registrationDate: [Date, Validators.required],
    })
  }

  //When you edit events you need to patch the value --> name of form should be identical to EventModel
  /*
  ngOnInit() {
    this.eventService.getDataFromBackend().subscribe(
      data => {
        this.eventForm.patchValue(data)
      }
    )
  }
   */

}
