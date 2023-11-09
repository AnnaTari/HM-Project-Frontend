import {Component, Input} from '@angular/core';
import {EventApi} from "../api/event.api";
import {Observable} from "rxjs";
import {EventModel} from "../shared/models/event.model";
import {CurrentStateService} from "../shared/services/current-state.service";
import {EventWithPictureModel} from "../shared/models/eventWithPicture.model";
import {DomSanitizer} from "@angular/platform-browser";

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent {

  events$: Observable<EventWithPictureModel[]>;
  actualEvents$: Observable<EventWithPictureModel[]>;
  futureEvents$: Observable<EventWithPictureModel[]>;
  today: Date = new Date;
  showImage: any;

  constructor(private eventApi: EventApi, private currentStateService: CurrentStateService, private sanitizer:DomSanitizer) {
    this.eventApi.check().subscribe((data)=> this.currentStateService.setEventObs(data));
    this.actualEvents$ = this.currentStateService.getActualEvents();
    this.futureEvents$ = this.currentStateService.getFutureEvents();
    this.events$ = this.currentStateService.getEventObs();
  }

  @Input()
  event: EventWithPictureModel= {eventHsvId: 0, adminId: 0, matchName: "", matchDetails: "", eventDate: new Date(), location:"", deadline: new Date(), ticketType: 0, ticketAmount: 0, registrationDate: new Date(), picture: new Uint8Array([])};

  transform(base64Image: Uint8Array) {
    return this.sanitizer.bypassSecurityTrustUrl('data:image/jpeg;base64,' + base64Image);
  }
  ngOnInit() {
    this.eventApi.check().subscribe((data => {
      this.currentStateService.separateActualAndFutureEvents(data);
    }))
    this.showImage = this.showImage(this.event.picture);
  }


}
