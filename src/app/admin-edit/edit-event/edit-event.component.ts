import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Observable, Subscription} from "rxjs";
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
    this.$actualEvents = this.currentStateService.getActualEvents()
    this.$futureEvents = this.currentStateService.getFutureEvents();
  }

  onFileChange(event: any) {
    this.selectedFile = event.target.files[0];
  }

  onSubmit() {
    console.log("Hallo")
    let adminId = 0;
    this.currentStateService.getAdminObs().subscribe((admin) => {
      adminId = admin.adminId ? admin.adminId : 0;
    })
    let eventDate = new Date(this.eventForm.value.matchDate);
    //eventDate.setTime(this.eventForm.value.matchTime);

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
    console.log(event);
    this.updateEvent(event);
    const reader = new FileReader();
    let byteArray = new Uint8Array();
    reader.onload = (picture: any) => {
      console.log("Hallo")
      let arrayBuffer = picture.target.result;
      byteArray = new Uint8Array(arrayBuffer);
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
    let id = Number(this.route.snapshot.paramMap.get('id'));
    if (id != null) {
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
    this.setFormular(this.event)
  }

  setFormular(event: EventWithPictureModel) {
    this.eventForm.controls['matchName'].setValue(event.matchName);
    this.eventForm.controls['matchDetails'].setValue(event.matchDetails);
    this.eventForm.controls['matchDate'].setValue(event.eventDate);
    this.eventForm.controls['location'].setValue(event.location);
    this.eventForm.controls['deadline'].setValue(event.deadline);
    this.eventForm.controls['ticketType'].setValue(event.ticketType);
    this.eventForm.controls['ticketAmount'].setValue(event.ticketAmount);
    this.eventForm.controls['registrationDate'].setValue(event.registrationDate);
  }

  updateEvent(event: EventModel) {
    let id = Number(this.route.snapshot.paramMap.get('id'));
    if (id == event.eventHsvId) {
      console.log(event);
      this.eventApi.updateEvent(event).subscribe((data) => this.currentStateService.separateActualAndFutureEvents(data));
    }
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
