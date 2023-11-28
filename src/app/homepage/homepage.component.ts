import {Component, Input, OnInit} from '@angular/core';
import {EventApi} from "../api/event.api";
import {Observable} from "rxjs";
import {CurrentStateService} from "../shared/services/current-state.service";
import {EventWithPictureModel} from "../shared/models/eventWithPicture.model";
import {DomSanitizer} from "@angular/platform-browser";

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit{

  //declare Observables
  events$: Observable<EventWithPictureModel[]>;
  actualEvents$: Observable<EventWithPictureModel[]>;
  futureEvents$: Observable<EventWithPictureModel[]>;

  //property of type date
  today: Date = new Date;
  showImage: any;

  //fetch event data from eventApi, setting event observation in current state service, retrieve actual and future events
  constructor(private eventApi: EventApi, private currentStateService: CurrentStateService, private sanitizer:DomSanitizer) {
    this.eventApi.check().subscribe((data)=> this.currentStateService.setEventObs(data));
    this.actualEvents$ = this.currentStateService.getActualEvents();
    this.futureEvents$ = this.currentStateService.getFutureEvents();
    this.events$ = this.currentStateService.getEventObs();
  }

  //define Input property event and provide default values
  @Input()
  event: EventWithPictureModel= {eventHsvId: 0, adminId: 0, matchName: "", matchDetails: "", eventDate: new Date(), location:"", deadline: new Date(), ticketType: 0, ticketAmount: 0, registrationDate: new Date(), picture: new Uint8Array([])};

  //method to generate URL for displaying a base64 image
  transform(base64Image: Uint8Array) {
    return this.sanitizer.bypassSecurityTrustUrl('data:image/jpeg;base64,' + base64Image);
  }

  ngOnInit() {
    this.showImage = this.transform(this.event.picture); //call transform method to assign to showImage property
    this.eventApi.check().subscribe((data => { //call check method of eventApi to retrieve event data
      this.currentStateService.separateActualAndFutureEvents(data); //separate actual and future events
    }))

  }


}
