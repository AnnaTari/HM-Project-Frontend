import {Component, Input, OnInit} from '@angular/core';
import {EventWithPictureModel} from "../../models/eventWithPicture.model";
import {DomSanitizer} from "@angular/platform-browser";


@Component({
  selector: 'app-event-detail',
  templateUrl: './event-detail.component.html',
  styleUrls: ['./event-detail.component.css']
})
export class EventDetailComponent implements OnInit{
  @Input()
  event: EventWithPictureModel = {eventHsvId:0, picture: new Uint8Array(), location: "", matchDetails: "", matchName:"", eventDate: new Date(), registrationDate: new Date(), ticketAmount: 0, ticketType: 0, adminId: 0, deadline: new Date()};

  imageToShow: any;

  constructor(private sanitizer:DomSanitizer) {
  }

  transform(base64Image: Uint8Array) {
    return this.sanitizer.bypassSecurityTrustUrl('data:image/jpeg;base64,' + base64Image);
  }

  ngOnInit() {
    this.imageToShow = this.transform(this.event.picture);
  }

}
