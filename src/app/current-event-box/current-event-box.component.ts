import {Component, Input, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {EventModel} from "../shared/models/event.model";
import {EventWithPictureModel} from "../shared/models/eventWithPicture.model";
import {DomSanitizer} from "@angular/platform-browser";
import {CurrentStateService} from "../shared/services/current-state.service";

@Component({
  selector: 'app-current-event-box',
  templateUrl: './current-event-box.component.html',
  styleUrls: ['./current-event-box.component.css']
})
export class CurrentEventBoxComponent implements OnInit{

  //constructor to inject the Router and DomSanitizer dependencies
  constructor (private router: Router, private currentStateService: CurrentStateService) { }

  //route to event-page
  navigateToEventPage(eventHsvId: number) {
    this.router.navigate(['./event-page', eventHsvId]);
  }

  //input property with default values
 @Input()
  event: EventWithPictureModel= {eventHsvId: 0, adminId: 0, matchName: "", matchDetails: "", eventDate: new Date(), location:"", deadline: new Date(), ticketType: 0, ticketAmount: 0, registrationDate: new Date(), picture: new Uint8Array([])};
  showImage: any;


  //ngOnInit calls transform method
  ngOnInit() {
    this.showImage = this.currentStateService.transform(this.event.picture);
  }
}
