import {Component, Input, OnInit} from '@angular/core';
import {EventWithPictureModel} from "../../shared/models/eventWithPicture.model";
import {DomSanitizer} from "@angular/platform-browser";
import {CurrentStateService} from "../../shared/services/current-state.service";


@Component({
  selector: 'app-event-detail',
  templateUrl: './event-detail.component.html',
  styleUrls: ['./event-detail.component.css']
})
export class EventDetailComponent implements OnInit {
  @Input()
  event: EventWithPictureModel = {
    eventHsvId: 0,
    picture: new Uint8Array(),
    location: "",
    matchDetails: "",
    matchName: "",
    eventDate: new Date(),
    registrationDate: new Date(),
    ticketAmount: 0,
    ticketType: 0,
    adminId: 0,
    deadline: new Date()
  };

  constructor(private currentStateService: CurrentStateService) {
  }

  ngOnInit() {
    this.imageToShow = this.currentStateService.transform(this.event.picture);
  }

  imageToShow: any;
}
