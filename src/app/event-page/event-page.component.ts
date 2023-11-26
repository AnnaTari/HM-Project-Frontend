import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";
import {CurrentStateService} from "../shared/services/current-state.service";
import {EmployeeApi} from "../api/employee.api";
import {BehaviorSubject} from "rxjs";
import {EventWithPictureModel} from "../shared/models/eventWithPicture.model";
import {PopUpComponent} from "../shared/components/pop-up/pop-up.component";
import {MatDialog} from "@angular/material/dialog";
import {RegistrationDtoModel} from "../shared/models/registrationDto-model";


@Component({
  selector: 'app-event-page',
  templateUrl: './event-page.component.html',
  styleUrls: ['./event-page.component.css']
})

/* eventdetails */

export class EventPageComponent implements OnInit {

  eventHsvId: number = 0;
  event: EventWithPictureModel = {
    eventHsvId: 0,
    adminId: 0,
    matchName: "",
    matchDetails: "",
    eventDate: new Date(),
    location: "",
    deadline: new Date(),
    ticketType: 0,
    ticketAmount: 0,
    registrationDate: new Date(),
    picture: new Uint8Array([])


  }
  private messageText: string = 'Teilnahme erfolgreich!';


  constructor(private currentStateService: CurrentStateService, private employeeApi: EmployeeApi, private route: ActivatedRoute, private dialog: MatDialog) {
  }

  /* getting eventHSVId */

  ngOnInit() {
    let idParam = Number(this.route.snapshot.paramMap.get('eventHsvId'));
    console.log(idParam);
    if (idParam) {
      this.eventHsvId = Number(idParam);
      console.log(this.eventHsvId);
      this.currentStateService.getActualEvents().subscribe((actualEvents) => {
        actualEvents.forEach((actualEvent) => {
          if (actualEvent.eventHsvId === this.eventHsvId) {
            this.event = actualEvent;
            console.log(this.event);
          }
        });
      });
    }
  }

  /* popup with message */

  openDialog() {
    this.route.snapshot.url.map(segments => segments.path);
    this.dialog.open(PopUpComponent, {
      data: {action: false, message: this.messageText, route: []},
    });
  }

  /* name, email required to submit */

  participationForm = new FormGroup({
    name: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    escortName: new FormControl(``),
  })

  isLoggedIn = new BehaviorSubject<boolean>(true);


  onSubmit() {
        console.log("Teilnahme bestätigt")
    let registrationDto: RegistrationDtoModel = {
      employee: {
        employeeId: 0,
        employeeName: this.participationForm.value.name ? this.participationForm.value.name : "",
        employeeEmail: this.participationForm.value.email ? this.participationForm.value.email : ""
      },
      eventHsvId: this.eventHsvId,
      escortName: this.participationForm.value.escortName ? this.participationForm.value.escortName : "",
      substituteWinner: false,
      winner: false
    }


   this.employeeApi.participate(registrationDto).subscribe()


  }
}
