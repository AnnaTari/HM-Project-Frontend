import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Observable} from "rxjs";
import {EventModel} from "../../shared/models/event.model";
import {EventWithPictureModel} from "../../shared/models/eventWithPicture.model";
import {CurrentStateService} from "../../shared/services/current-state.service";
import {EventApi} from "../../api/event.api";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-edit-event',
  templateUrl: './edit-event.component.html',
  styleUrls: ['./edit-event.component.css'],
})
export class EditEventComponent implements OnInit {
  $actualEvents: Observable<EventWithPictureModel[]>;
  $futureEvents: Observable<EventWithPictureModel[]>;

  event: EventWithPictureModel = {
    eventDate: new Date(),
    eventHsvId: 0,
    adminId: 0,
    deadline: new Date(),
    location: "",
    matchDetails: "",
    matchName: "",
    picture: new Uint8Array(),
    registrationDate: new Date(),
    ticketAmount: 0,
    ticketType: 0,
  };

  eventForm: FormGroup;

  selectedFile: File | undefined;

  constructor(private fb: FormBuilder, private currentStateService: CurrentStateService, private eventApi: EventApi, private router: Router, private route: ActivatedRoute) {
    //Initialising the formGroup
    this.eventForm = this.fb.group({
      matchName: ['', Validators.required],
      matchDetails: [''],
      matchDate: [Date, Validators.required],
      matchTime: ['', Validators.required],
      location: ['Volksparkstadion'],
      deadline: [Date, Validators.required],
      ticketType: [2, Validators.required],
      ticketAmount: [0, Validators.required],
      registrationDate: [Date, Validators.required],
    })
    this.$actualEvents = this.currentStateService.getActualEvents()
    this.$futureEvents = this.currentStateService.getFutureEvents();
  }


  ngOnInit(): void {
    //When editing an event you have a value in id which is not null and not 0
    let id = Number(this.route.snapshot.paramMap.get('id'));
    if (id != null && id != 0) {
      this.$actualEvents.subscribe((actualEvents) => {
        actualEvents.forEach(actualEvent => {
          if (actualEvent.eventHsvId == id) {
            this.event = actualEvent;
          }
        })
      })
      this.$futureEvents.subscribe((futureEvents) => {
        futureEvents.forEach(futureEvent => {
          if (futureEvent.eventHsvId == id) {
            this.event = futureEvent;
          }
        })
      })
    }
    //When you extracted which event you edit, you can set the form with its values
    this.setForm(this.event);
  }


  //Its activated when you choose a file in the form
  onFileChange(event: any) {
    this.selectedFile = event.target.files[0];
  }

  onSubmit() {
    let event = this.preparingEvent();

    //preparing picture field
    const reader = new FileReader();
    let byteArray = new Uint8Array();
    reader.onload = (picture: any) => {
      let arrayBuffer = picture.target.result;
      byteArray = new Uint8Array(arrayBuffer);
      this.sendEvent(event, byteArray);
    };
    //this is very important --> so that the picture can be read!
    if (this.selectedFile) {
      reader.readAsArrayBuffer(this.selectedFile);
    }
    this.router.navigate(['admin-edit']);
  }


  private preparingEvent(): EventModel {
    let adminId = 0;
    this.currentStateService.getAdminObs().subscribe((admin) => {
      adminId = admin.adminId ? admin.adminId : 1;
    })
    //Preparing the date and time fields
    let eventDate = new Date(this.eventForm.value.matchDate);
    let matchTime = this.eventForm.value.matchTime.split(':'); // splitting the time string into hours and minutes
    let hours = matchTime[0];
    let minutes = matchTime[1];
    eventDate.setHours(hours);
    eventDate.setMinutes(minutes);
    eventDate.setSeconds(0); // set seconds to 0 if not provided

    //an event object with all values from the form without the picture because its sent separately to backend (see eventApi)

    return {
      eventHsvId: this.event.eventHsvId,
      adminId: adminId,
      matchName: this.eventForm.value.matchName,
      matchDetails: this.eventForm.value.matchDetails,
      eventDate: eventDate,
      location: this.eventForm.value.location,
      deadline: this.eventForm.value.deadline,
      ticketType: this.eventForm.value.ticketType,
      ticketAmount: this.eventForm.value.ticketAmount,
      registrationDate: this.eventForm.value.registrationDate,
    };
  }

//need to use this method because in the api I stringify this event
  toJSON(event: EventModel) {
    return {
      eventHsvId: event.eventHsvId,
      adminId: event.adminId,
      matchName: event.matchName,
      matchDetails: event.matchDetails,
      eventDate: event.eventDate,
      location: event.location,
      deadline: event.deadline,
      ticketType: event.ticketType,
      ticketAmount: event.ticketAmount,
      registrationDate: event.registrationDate,
    };
  }

  setForm(event: EventWithPictureModel) {
    this.eventForm.controls['matchName'].setValue(event.matchName);
    this.eventForm.controls['matchDetails'].setValue(event.matchDetails);
    this.eventForm.controls['matchDate'].setValue(event.eventDate);
    this.eventForm.controls['location'].setValue(event.location);
    this.eventForm.controls['deadline'].setValue(event.deadline);
    this.eventForm.controls['ticketType'].setValue(event.ticketType);
    this.eventForm.controls['ticketAmount'].setValue(event.ticketAmount);
    this.eventForm.controls['registrationDate'].setValue(event.registrationDate);
    this.eventForm.controls['deadline'].setValue(event.deadline);
    let date = new Date(event.eventDate);
    this.eventForm.controls['matchTime'].setValue(`${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`);
    const byteArray = new Uint8Array(event.picture);
    const file = new File([byteArray], "", {type: 'image/jpeg'});

    const fileInput = document.getElementById('fileInput') as HTMLInputElement;
    const fileList = new DataTransfer();
    fileList.items.add(file);

    fileInput.files = fileList.files;
    fileInput.dispatchEvent(new Event('change'));
  }

  sendEvent(event: EventModel, byteArray:Uint8Array) {
    let id = Number(this.route.snapshot.paramMap.get('id'));
    if (id != 0 && id != null) {
      //sends updated event to the backend
      this.eventApi.updateEvent(this.toJSON(event), Array.from(byteArray)).subscribe((data) => this.currentStateService.separateActualAndFutureEvents(data));
    }else {
      //sends added event to the backend
      this.eventApi.addEvent(this.toJSON(event), Array.from(byteArray)).subscribe((events) => this.currentStateService.separateActualAndFutureEvents(events));
    }
  }
}
