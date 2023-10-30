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
      gameTitle: ['', Validators.required],
      gameDate: [Date, Validators.required],
      gameTime: ['', Validators.required],
      gamePlace: ['Volksparkstadion', Validators.required],
      ticketAmount: [0, Validators.required],
      ticketKind: [2, Validators.required],
      registrationDeadline: [Date, Validators.required],
      gamePicture: [],
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
