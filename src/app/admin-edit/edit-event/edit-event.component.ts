import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
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
    this.eventForm = this.fb.group({
      matchName: [''],
      matchDetails: [''],
      matchDate: [Date],
      matchTime: [''],
      location: ['Volksparkstadion'],
      deadline: [Date],
      ticketType: [2],
      ticketAmount: [0],
      registrationDate: [Date],
    })
    this.$actualEvents = this.currentStateService.getActualEvents()
    this.$futureEvents = this.currentStateService.getFutureEvents();
  }

  onFileChange(event: any) {
    this.selectedFile = event.target.files[0];
  }

  onSubmit() {
    let adminId = 0;
    this.currentStateService.getAdminObs().subscribe((admin) => {
      adminId = admin.adminId ? admin.adminId : 0;
    })
    //Preparing the date and time fields
    let eventDate = new Date(this.eventForm.value.matchDate);
    let matchTime = this.eventForm.value.matchTime.split(':'); // splitting the time string into hours and minutes
    let hours = matchTime[0];
    let minutes = matchTime[1];
    eventDate.setHours(hours);
    eventDate.setMinutes(minutes);
    eventDate.setSeconds(0); // set seconds to 0 if not provided

    let event: EventModel = {
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
    }
    const reader = new FileReader();
    let byteArray = new Uint8Array();
    reader.onload = (picture: any) => {
      let arrayBuffer = picture.target.result;
      byteArray = new Uint8Array(arrayBuffer);
      //adds event into the database
      this.eventApi.addEvent(this.toJSON(event), Array.from(byteArray)).subscribe((events) => this.currentStateService.separateActualAndFutureEvents(events));
    };
    //this is very important --> so that the picture can be read!
    if (this.selectedFile) {
      reader.readAsArrayBuffer(this.selectedFile);
    }
    this.router.navigate(['admin-edit']);
  }


  //need to use this method because in the api i stringify this event
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

  ngOnInit(): void {
    //When editing an event
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
    this.setForm(this.event);
    this.updateEvent(this.event, id);
  }

  setForm(event: EventWithPictureModel) {
    this.eventForm.controls['matchName'].setValue(event.matchName);
    this.eventForm.controls['matchDetails'].setValue(event.matchDetails);
    this.eventForm.controls['matchDate'].setValue(event.eventDate);
    let date = new Date(event.eventDate);
    this.eventForm.controls['matchTime'].setValue(`${date.getHours()}:${date.getMinutes()}`);
    this.eventForm.controls['location'].setValue(event.location);
    this.eventForm.controls['deadline'].setValue(event.deadline);
    this.eventForm.controls['ticketType'].setValue(event.ticketType);
    this.eventForm.controls['ticketAmount'].setValue(event.ticketAmount);
    this.eventForm.controls['registrationDate'].setValue(event.registrationDate);
    this.eventForm.controls['deadline'].setValue(event.deadline);
    this.eventForm.controls['eventDate'].setValue(date);
  }

  updateEvent(event: EventModel, id: number) {
    if (id != 0) {
      this.eventApi.updateEvent(event).subscribe((data) => this.currentStateService.separateActualAndFutureEvents(data));
    }
  }
}
