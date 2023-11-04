import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {EventModel} from "../../shared/models/event.model";
import {CurrentStateService} from "../../shared/services/current-state.service";
import {EventApi} from "../../api/event.api";

@Component({
  selector: 'app-edit-event',
  templateUrl: './edit-event.component.html',
  styleUrls: ['./edit-event.component.css']
})
export class EditEventComponent {
  eventForm: FormGroup;

  selectedFile: File | undefined;

  constructor(private fb: FormBuilder, private currentStateService: CurrentStateService, private eventApi: EventApi) {
    this.eventForm = this.fb.group({
      matchName: ['', Validators.required],
      matchDetails: ['', Validators.required],
      matchDate: [Date, Validators.required],
      matchTime: [''],
      location: ['Volksparkstadion', Validators.required],
      deadline: [Date, Validators.required],
      ticketType: [2, Validators.required],
      ticketAmount: [0, Validators.required],
      registrationDate: [Date, Validators.required],
    })
  }

  onFileChange(event: any) {
    this.selectedFile = event.target.files[0];
  }

  onSubmit() {
    let adminId = 0;
    this.currentStateService.getAdminObs().subscribe((admin) => {
      adminId = admin.adminId ? admin.adminId : 0;
    })
    let eventDate = new Date(this.eventForm.value.matchDate);
    //eventDate.setTime(this.eventForm.value.matchTime);

    let event: EventModel = {
      eventHsvId: 0,
      adminId: adminId,
      matchName: this.eventForm.value.matchName,
      matchDetails: this.eventForm.value.matchDetails,
      eventDate: eventDate,
      location: this.eventForm.value.location,
      deadline: this.eventForm.value.deadline,
      ticketType: this.eventForm.value.ticketType,
      ticketAmount: this.eventForm.value.ticketAmount,
      registrationDate: this.eventForm.value.registrationDate
    }


    const reader = new FileReader();
    reader.onload = (event: any) => {
      let arrayBuffer = event.target.result;
      let byteArray = new Uint8Array(arrayBuffer);
      this.eventApi.addEvent(event, Array.from(byteArray)).subscribe((events) => this.currentStateService.separateActualAndFutureEvents(events));
    };
    reader.readAsArrayBuffer(this.selectedFile!);

    console.log(event);
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
